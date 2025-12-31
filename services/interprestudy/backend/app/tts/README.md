# Text-to-Speech Module for InterpreStudy

This module provides multi-speaker text-to-speech capabilities using Google's Gemini 2.5 Pro TTS API, designed specifically for generating realistic medical interpreter training scenarios.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure API Key

Add your Gemini API key to the `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_api_key_here
```

## Usage

### Quick Start (Recommended)

Use the convenience function for simple scenarios:

```python
from app.tts import generate_scenario_audio

dialogue = """
Speaker 1: Good morning, how are you feeling today?
Speaker 2: I've been experiencing some chest pain, doctor.
"""

files = generate_scenario_audio(
    dialogue_text=dialogue,
    output_dir="./audio_output",
    file_prefix="medical_scenario"
)

print(f"Generated: {files}")
```

### Advanced Usage

Use the `GeminiTTS` class for more control:

```python
from app.tts import GeminiTTS

# Initialize
tts = GeminiTTS()

# Custom speaker configuration
speaker_configs = [
    {"speaker": "Speaker 1", "voice_name": "Charon"},  # Male voice
    {"speaker": "Speaker 2", "voice_name": "Zephyr"},  # Female voice
]

# Generate with custom settings
files = tts.generate_audio(
    dialogue_text=dialogue,
    output_dir="./output",
    file_prefix="scenario",
    speaker_configs=speaker_configs,
    temperature=0.8
)
```

### From Jupyter Notebooks

See [`notebooks/02_mock_scenario_generator.ipynb`](../notebooks/02_mock_scenario_generator.ipynb) for complete examples of using this module from notebooks.

## API Reference

### `generate_scenario_audio()`

Convenience function to quickly generate audio from dialogue text.

**Parameters:**

- `dialogue_text` (str): The dialogue with speaker labels (e.g., "Speaker 1:", "Speaker 2:")
- `output_dir` (str): Directory to save output files (default: "output")
- `file_prefix` (str): Prefix for output file names (default: "scenario")
- `api_key` (str, optional): API key (defaults to `GEMINI_API_KEY` env var)

**Returns:**

- `List[str]`: List of file paths to generated audio files

### `GeminiTTS`

Main class for text-to-speech generation.

#### `__init__(api_key: Optional[str] = None)`

Initialize the TTS client.

**Parameters:**

- `api_key` (str, optional): API key (defaults to `GEMINI_API_KEY` env var)

#### `generate_audio()`

Generate audio from dialogue text with multiple speakers.

**Parameters:**

- `dialogue_text` (str): The dialogue text with speaker labels
- `output_dir` (str): Directory to save output files (default: "output")
- `file_prefix` (str): Prefix for output file names (default: "scenario")
- `speaker_configs` (List[Dict], optional): Custom speaker configurations
- `temperature` (float): Generation temperature 0-1 (default: 1.0)

**Returns:**

- `List[str]`: List of file paths to generated audio files

## Available Voices

- **Charon**: Male voice (default for Speaker 1)
- **Zephyr**: Female voice (default for Speaker 2)

## Configuration Options

### Temperature

Controls the randomness of generation (0-1):

- **Lower (0.3-0.5)**: More consistent, predictable output
- **Medium (0.6-0.8)**: Balanced variation
- **Higher (0.9-1.0)**: More varied, natural-sounding output

## Output Format

Audio files are automatically saved as WAV format for maximum compatibility. If the API returns a different format, it's automatically converted to WAV with appropriate headers.

## Examples

### Example 1: Simple Medical Consultation

```python
dialogue = """
Speaker 1: What brings you in today?
Speaker 2: I've had a persistent cough for two weeks.
Speaker 1: Have you had any fever or shortness of breath?
Speaker 2: No fever, but sometimes I feel a bit winded.
"""

files = generate_scenario_audio(dialogue, output_dir="./scenarios")
```

### Example 2: Multi-Turn Telemedicine Visit

See the notebook for a complete example with a full telemedicine consultation scenario.

## Troubleshooting

### API Key Not Found

Make sure `GEMINI_API_KEY` is set in your `.env` file:

```bash
echo "GEMINI_API_KEY=your_key_here" >> .env
```

### Import Errors in Notebooks

If you get import errors, ensure you're adding the parent directory to the path:

```python
import sys
from pathlib import Path
sys.path.append(str(Path.cwd().parent))
```

### Audio Quality Issues

Try adjusting the temperature parameter for better quality:

```python
tts.generate_audio(dialogue, temperature=0.7)
```

## License

This module is part of the InterpreStudy backend service.
