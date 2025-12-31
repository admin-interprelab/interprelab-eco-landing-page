"""
Gemini Text-to-Speech Module for Medical Interpreter Training Scenarios

This module provides functionality to generate multi-speaker audio dialogues
using Google's Gemini 2.5 Pro TTS model. It's designed specifically for
creating realistic medical interpreter training scenarios.
"""

import base64
import mimetypes
import os
import re
import struct
from pathlib import Path
from typing import Optional, List, Dict
from google import genai
from google.genai import types


class GeminiTTS:
    """
    A wrapper class for Google's Gemini TTS API with multi-speaker support.
    
    This class handles text-to-speech generation with multiple speaker voices,
    particularly useful for creating medical interpreter training scenarios.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Gemini TTS client.
        
        Args:
            api_key: Optional API key. If not provided, will use GEMINI_API_KEY env var.
        """
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError(
                "GEMINI_API_KEY must be provided or set as environment variable"
            )
        self.client = genai.Client(api_key=self.api_key)
        self.model = "gemini-2.5-pro-preview-tts"
    
    def generate_audio(
        self,
        dialogue_text: str,
        output_dir: str = "output",
        file_prefix: str = "scenario",
        speaker_configs: Optional[List[Dict[str, str]]] = None,
        temperature: float = 1.0,
    ) -> List[str]:
        """
        Generate audio from dialogue text with multiple speakers.
        
        Args:
            dialogue_text: The dialogue text with speaker labels (e.g., "Speaker 1:", "Speaker 2:")
            output_dir: Directory to save output files
            file_prefix: Prefix for output file names
            speaker_configs: List of dicts with 'speaker' and 'voice_name' keys.
                           If None, defaults to Speaker 1 (Charon) and Speaker 2 (Zephyr)
            temperature: Generation temperature (0-1)
        
        Returns:
            List of file paths to generated audio files
        """
        # Create output directory if it doesn't exist
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Default speaker configuration
        if speaker_configs is None:
            speaker_configs = [
                {"speaker": "Speaker 1", "voice_name": "Charon"},
                {"speaker": "Speaker 2", "voice_name": "Zephyr"},
            ]
        
        # Build speaker voice configs
        voice_configs = []
        for config in speaker_configs:
            voice_configs.append(
                types.SpeakerVoiceConfig(
                    speaker=config["speaker"],
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(
                            voice_name=config["voice_name"]
                        )
                    ),
                )
            )
        
        # Prepare content
        contents = [
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=f"Read aloud in a warm, welcoming tone\n{dialogue_text}")],
            ),
        ]
        
        # Configure generation
        generate_content_config = types.GenerateContentConfig(
            temperature=temperature,
            response_modalities=["audio"],
            speech_config=types.SpeechConfig(
                multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
                    speaker_voice_configs=voice_configs
                ),
            ),
        )
        
        # Generate and save audio
        generated_files = []
        file_index = 0
        
        for chunk in self.client.models.generate_content_stream(
            model=self.model,
            contents=contents,
            config=generate_content_config,
        ):
            if (
                chunk.candidates is None
                or chunk.candidates[0].content is None
                or chunk.candidates[0].content.parts is None
            ):
                continue
            
            if (
                chunk.candidates[0].content.parts[0].inline_data 
                and chunk.candidates[0].content.parts[0].inline_data.data
            ):
                file_name = f"{file_prefix}_{file_index}"
                file_index += 1
                inline_data = chunk.candidates[0].content.parts[0].inline_data
                data_buffer = inline_data.data
                file_extension = mimetypes.guess_extension(inline_data.mime_type)
                
                if file_extension is None:
                    file_extension = ".wav"
                    data_buffer = self._convert_to_wav(inline_data.data, inline_data.mime_type)
                
                file_path = output_path / f"{file_name}{file_extension}"
                self._save_binary_file(str(file_path), data_buffer)
                generated_files.append(str(file_path))
            else:
                if hasattr(chunk, 'text') and chunk.text:
                    print(chunk.text)
        
        return generated_files
    
    @staticmethod
    def _save_binary_file(file_path: str, data: bytes) -> None:
        """Save binary data to a file."""
        with open(file_path, "wb") as f:
            f.write(data)
        print(f"File saved to: {file_path}")
    
    @staticmethod
    def _convert_to_wav(audio_data: bytes, mime_type: str) -> bytes:
        """
        Generates a WAV file header for the given audio data and parameters.
        
        Args:
            audio_data: The raw audio data as a bytes object.
            mime_type: Mime type of the audio data.
        
        Returns:
            A bytes object representing the WAV file with header.
        """
        parameters = GeminiTTS._parse_audio_mime_type(mime_type)
        bits_per_sample = parameters["bits_per_sample"]
        sample_rate = parameters["rate"]
        num_channels = 1
        data_size = len(audio_data)
        bytes_per_sample = bits_per_sample // 8
        block_align = num_channels * bytes_per_sample
        byte_rate = sample_rate * block_align
        chunk_size = 36 + data_size  # 36 bytes for header fields before data chunk size
        
        # http://soundfile.sapp.org/doc/WaveFormat/
        header = struct.pack(
            "<4sI4s4sIHHIIHH4sI",
            b"RIFF",          # ChunkID
            chunk_size,       # ChunkSize (total file size - 8 bytes)
            b"WAVE",          # Format
            b"fmt ",          # Subchunk1ID
            16,               # Subchunk1Size (16 for PCM)
            1,                # AudioFormat (1 for PCM)
            num_channels,     # NumChannels
            sample_rate,      # SampleRate
            byte_rate,        # ByteRate
            block_align,      # BlockAlign
            bits_per_sample,  # BitsPerSample
            b"data",          # Subchunk2ID
            data_size         # Subchunk2Size (size of audio data)
        )
        return header + audio_data
    
    @staticmethod
    def _parse_audio_mime_type(mime_type: str) -> Dict[str, int]:
        """
        Parses bits per sample and rate from an audio MIME type string.
        
        Assumes bits per sample is encoded like "L16" and rate as "rate=xxxxx".
        
        Args:
            mime_type: The audio MIME type string (e.g., "audio/L16;rate=24000").
        
        Returns:
            A dictionary with "bits_per_sample" and "rate" keys.
        """
        bits_per_sample = 16
        rate = 24000
        
        # Extract rate from parameters
        parts = mime_type.split(";")
        for param in parts:
            param = param.strip()
            if param.lower().startswith("rate="):
                try:
                    rate_str = param.split("=", 1)[1]
                    rate = int(rate_str)
                except (ValueError, IndexError):
                    pass  # Keep rate as default
            elif param.startswith("audio/L"):
                try:
                    bits_per_sample = int(param.split("L", 1)[1])
                except (ValueError, IndexError):
                    pass  # Keep bits_per_sample as default if conversion fails
        
        return {"bits_per_sample": bits_per_sample, "rate": rate}


def generate_scenario_audio(
    dialogue_text: str,
    output_dir: str = "output",
    file_prefix: str = "scenario",
    api_key: Optional[str] = None,
) -> List[str]:
    """
    Convenience function to generate audio from dialogue text.
    
    Args:
        dialogue_text: The dialogue text with speaker labels
        output_dir: Directory to save output files
        file_prefix: Prefix for output file names
        api_key: Optional API key. If not provided, will use GEMINI_API_KEY env var.
    
    Returns:
        List of file paths to generated audio files
    
    Example:
        >>> dialogue = '''
        ... Speaker 1: Hello, how are you feeling today?
        ... Speaker 2: I'm not feeling well, doctor.
        ... '''
        >>> files = generate_scenario_audio(dialogue, output_dir="./audio")
    """
    tts = GeminiTTS(api_key=api_key)
    return tts.generate_audio(dialogue_text, output_dir, file_prefix)
