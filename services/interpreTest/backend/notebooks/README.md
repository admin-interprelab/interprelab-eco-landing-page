# Jupyter Notebooks - InterpreTest Backend

This directory contains Jupyter notebooks for **Phase 2: Prototyping & Experimentation** of the LLM backend integration.

## 📚 Available Notebooks

### 1. `01_transcription_test.ipynb` - Audio Transcription Testing

**Purpose:** Test OpenAI Whisper API for audio transcription

**Features:**

- Basic transcription testing
- Bilingual interpretation handling (English/Spanish)
- Word Error Rate (WER) calculation
- Benchmark transcription accuracy

**Requirements:**

- OpenAI API key
- Test audio files in `test_audio/` directory

**Key Functions:**

- `transcribe_audio()` - Transcribe audio with Whisper
- `calculate_wer()` - Calculate word error rate

---

### 2. `02_spacy_grammar_analysis.ipynb` - Linguistic Analysis

**Purpose:** Deep grammar and linguistic analysis using spaCy

**Features:**

- Part-of-Speech (POS) tagging
- Dependency parsing visualization
- Verb tense detection and accuracy
- Grammatical error detection
- Semantic similarity analysis

**Requirements:**

- spaCy models: `en_core_web_lg`, `es_core_news_lg`
- Install: `python -m spacy download en_core_web_lg`

**Key Functions:**

- `analyze_pos()` - Extract POS tags
- `detect_verb_tenses()` - Identify verb tenses
- `compare_tense_accuracy()` - Compare source vs interpretation
- `detect_common_errors()` - Find grammatical issues

---

### 3. `03_scispacy_medical_ner.ipynb` - Medical Entity Recognition

**Purpose:** Recognize medical entities using scispaCy

**Features:**

- Medical entity extraction (diseases, medications, procedures)
- UMLS concept linking
- Negation detection (negspaCy)
- Medication name mapping (generic ↔ brand)
- Medical terminology accuracy assessment

**Requirements:**

- scispaCy models: `en_core_sci_lg`, `en_ner_bc5cdr_md`
- Install: See notebook for download links

**Key Functions:**

- `extract_medical_entities()` - Extract medical terms
- `link_to_umls()` - Link to UMLS concepts
- `detect_negations()` - Find negated entities
- `compare_medical_accuracy()` - Assess terminology accuracy

---

### 4. `04_claude_feedback_generation.ipynb` - AI Feedback Generation

**Purpose:** Generate interpreter feedback using Claude 3.5 Sonnet

**Features:**

- Structured feedback generation
- Enhanced feedback with NLP analysis
- Prompt engineering experiments
- Personalized learning path creation
- Cost & performance benchmarking

**Requirements:**

- Anthropic API key

**Key Functions:**

- `generate_feedback()` - Basic feedback generation
- `generate_enhanced_feedback()` - Feedback with NLP integration
- `generate_learning_path()` - Create customized learning paths
- `benchmark_claude_performance()` - Track costs and performance

---

## 🚀 Getting Started

### 1. Install Dependencies

```powershell
cd services/interpreTest/backend
.\setup.ps1
pip install -r requirements.txt
```

### 2. Download spaCy Models

```powershell
python -m spacy download en_core_web_lg
python -m spacy download es_core_news_lg
```

### 3. Install scispaCy Models

```powershell
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.0/en_core_sci_lg-0.5.0.tar.gz
pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.0/en_ner_bc5cdr_md-0.5.0.tar.gz
```

### 4. Set Up Environment Variables

Create `.env` file in `backend/` directory:

```env
# API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# Supabase
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
```

### 5. Launch JupyterLab

```powershell
jupyter lab
```

This will open JupyterLab in your browser at `http://localhost:8888`

---

## 📝 Workflow

### Recommended Order

1. **Start with `01_transcription_test.ipynb`**
   - Test audio transcription
   - Create test audio samples for interpreter assessments

2. **Move to `02_spacy_grammar_analysis.ipynb`**
   - Test grammar analysis on transcribed text
   - Benchmark tense accuracy, error detection

3. **Continue with `03_scispacy_medical_ner.ipynb`**
   - Test medical terminology extraction
   - Build medication name mappings

4. **Finish with `04_claude_feedback_generation.ipynb`**
   - Integrate NLP results with Claude
   - Generate comprehensive feedback
   - Optimize prompts

### Creating Test Data

1. **Audio Files:**
   - Place test audio in `test_audio/`
   - Use formats: MP3, WAV, M4A
   - Create bilingual interpretation samples

2. **Ground Truth Transcripts:**
   - Create reference transcripts for accuracy testing
   - Include medical terminology examples

3. **Interpretation Pairs:**
   - Collect source + interpretation pairs
   - Include various error types (grammar, omissions, terminology)

---

## 🎯 Success Criteria

After completing these notebooks, you should have:

✅ Working Whisper transcription pipeline  
✅ spaCy grammar analysis functions  
✅ scispaCy medical entity recognition  
✅ Claude feedback generation system  
✅ Benchmarked accuracy and costs  
✅ Optimized prompts for each LLM task  

---

## 🔄 Next Steps (Phase 3)

Once prototyping is complete:

1. **Productionize Code:**
   - Move successful patterns to `app/nlp/` and `app/llm/`
   - Create production-ready modules

2. **Build API Endpoints:**
   - `/api/analyze/audio` - Full audio analysis pipeline
   - `/api/analyze/text` - Text-only analysis
   - `/api/feedback/generate` - Generate feedback

3. **Testing:**
   - Unit tests in `tests/`
   - Integration tests with sample data

4. **Documentation:**
   - API documentation
   - Model performance benchmarks

---

## 💡 Tips

- **Use `.ipynb_checkpoints/` for autosaves** - Already in `.gitignore`
- **Save large test data separately** - Don't commit large audio files
- **Track API costs** - Monitor usage in each notebook
- **Document findings** - Add markdown cells with insights
- **Version control** - Commit notebooks with outputs cleared

---

## 📊 Expected Results

### Transcription (Whisper)

- WER: <5% for clear audio
- Processing time: ~10-30s per minute of audio
- Cost: ~$0.006/minute

### Grammar Analysis (spaCy)

- Tense accuracy: >85%
- Processing time: <1s per interpretation
- Cost: Free (open source)

### Medical NER (scispaCy)

- Entity recall: >90%
- Processing time: <2s per interpretation
- Cost: Free (open source)

### Feedback (Claude 3.5)

- Response time: 3-8s
- Cost: ~$0.02-0.05 per feedback
- Quality: High (human-level insights)

---

## 🆘 Troubleshooting

### Common Issues

1. **"Model not found" errors**

   ```powershell
   python -m spacy download en_core_web_lg
   ```

2. **API key errors**
   - Check `.env` file exists
   - Verify API keys are valid
   - Ensure `python-dotenv` is installed

3. **Memory issues**
   - Close unused notebooks
   - Restart kernel: Kernel → Restart
   - Use smaller test datasets

4. **Import errors**
   - Verify virtual environment is activated
   - Reinstall: `pip install -r requirements.txt`

---

## 📖 Resources

- [spaCy Documentation](https://spacy.io/usage)
- [scispaCy Documentation](https://allenai.github.io/scispacy/)
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Anthropic Claude API](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
- [negspaCy GitHub](https://github.com/jenojp/negspacy)
