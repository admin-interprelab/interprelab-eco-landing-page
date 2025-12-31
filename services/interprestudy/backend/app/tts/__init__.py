"""Text-to-Speech module for InterpreStudy backend."""

from .gemini_tts import GeminiTTS, generate_scenario_audio

__all__ = ["GeminiTTS", "generate_scenario_audio"]
