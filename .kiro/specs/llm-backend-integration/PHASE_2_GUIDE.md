# Phase 2: Jupyter Notebook Prototyping Guide

This guide walks you through Phase 2 of the LLM Backend Integration project. Phase 2 focuses on prototyping and experimenting with AI/NLP capabilities in Jupyter notebooks before productionizing them.

## 🎯 Phase 2 Objectives

1. ✅ Test OpenAI Whisper API for audio transcription
2. ✅ Experiment with spaCy for grammar analysis
3. ✅ Test scispaCy for medical entity recognition
4. ✅ Prototype Claude 3.5 Sonnet for feedback generation
5. ✅ Benchmark accuracy, performance, and costs
6. ✅ Optimize prompts and pipelines
7. Document findings for Phase 3 (Productionization)

---

## 📋 Prerequisites

### ✅ Phase 1 Complete

- Backend directory structure created
- FastAPI application running
- Virtual environment set up
- Dependencies installed

### 🔑 API Keys Required

Create `.env` file in `services/interpreTest/backend/`:

```env
# Required for Phase 2
OPENAI_API_KEY=sk-...                    # For Whisper transcription
ANTHROPIC_API_KEY=sk-ant-...              # For Claude 3.5 Sonnet

# Required for Phase 3+ (Database integration)
GOOGLE_AI_API_KEY=...                     # Optional for Phase 2
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
```

**Where to get API keys:**

- OpenAI: <https://platform.openai.com/api-keys>
- Anthropic: <https://console.anthropic.com/settings/keys>
- Google AI: <https://makersuite.google.com/app/apikey>

---

## 🚀 Quick Start

### Step 1: Set Up Jupyter Environment

```powershell
# Navigate to backend directory
cd services/interpreTest/backend

# Ensure virtual environment is active
.\setup.ps1

# Set up Jupyter notebooks
cd notebooks
.\setup_notebooks.ps1
```

This script will:

- ✅ Install JupyterLab and IPython kernel
- ✅ Download spaCy models (en_core_web_lg, es_core_news_lg)
- ✅ Install scispaCy models (en_core_sci_lg, en_ner_bc5cdr_md)
- ✅ Create `test_audio/` and `test_data/` directories

**Time estimate:** 10-15 minutes (depending on download speed)

### Step 2: Launch JupyterLab

```powershell
jupyter lab
```

JupyterLab will open in your browser at `http://localhost:8888`

---

## 📚 Notebook Workflow

### Recommended Order

Work through the notebooks in this sequence:

#### 1️⃣ **Audio Transcription** (`01_transcription_test.ipynb`)

**Estimated time:** 1-2 hours

**What you'll do:**

- Test Whisper API with sample audio
- Calculate Word Error Rate (WER)
- Benchmark transcription accuracy
- Test bilingual interpretation (English/Spanish)

**Required:**

- OpenAI API key
- Sample audio files (MP3, WAV, M4A)

**Deliverables:**

- Working transcription function
- Accuracy benchmarks
- Cost estimates

---

#### 2️⃣ **Grammar Analysis** (`02_spacy_grammar_analysis.ipynb`)

**Estimated time:** 2-3 hours

**What you'll do:**

- POS tagging and dependency parsing
- Verb tense detection
- Grammatical error identification
- Semantic similarity analysis

**Required:**

- spaCy models installed
- Sample interpretation pairs (source + interpretation)

**Deliverables:**

- Grammar analysis functions
- Tense accuracy metrics
- Error detection rules

---

#### 3️⃣ **Medical Entity Recognition** (`03_scispacy_medical_ner.ipynb`)

**Estimated time:** 2-3 hours

**What you'll do:**

- Extract medical entities (diseases, medications, procedures)
- Link entities to UMLS concepts
- Detect negations (negspaCy)
- Build medication name mappings

**Required:**

- scispaCy models installed
- Medical interpretation samples

**Deliverables:**

- Medical NER functions
- Terminology accuracy benchmarks
- UMLS linking capabilities

---

#### 4️⃣ **Feedback Generation** (`04_claude_feedback_generation.ipynb`)

**Estimated time:** 3-4 hours

**What you'll do:**

- Generate structured interpreter feedback
- Integrate NLP analysis results
- Experiment with prompt engineering
- Create personalized learning paths
- Benchmark costs and performance

**Required:**

- Anthropic API key
- Results from previous notebooks

**Deliverables:**

- Feedback generation system
- Optimized prompts
- Cost/performance benchmarks
- Learning path generator

---

## 🧪 Creating Test Data

### Audio Samples

**Where to get test audio:**

1. **Record your own:**
   - Use phone voice recorder
   - Simulate patient-provider conversations
   - Include medical terminology

2. **Public datasets:**
   - Common Voice (Mozilla)
   - LibriSpeech
   - Medical lecture recordings

3. **Structure:**

   ```
   test_audio/
   ├── english/
   │   ├── clear_audio_01.mp3
   │   ├── noisy_audio_01.mp3
   │   └── heavy_accent_01.mp3
   ├── spanish/
   │   └── spanish_01.mp3
   └── bilingual/
       └── interpretation_sample_01.mp3
   ```

### Interpretation Pairs

Create test cases with common errors:

```json
{
  "source": "The patient has been taking metformin for diabetes.",
  "interpretation": "The patient take medicine for sugar.",
  "expected_issues": [
    "grammatical_error: verb agreement",
    "terminology: metformin → medicine",
    "terminology: diabetes → sugar",
    "omission: duration (has been taking)"
  ]
}
```

**Save as:** `test_data/interpretation_pairs.json`

---

## 📊 Success Metrics

By the end of Phase 2, you should achieve:

### Transcription (Whisper)

- ✅ WER < 5% for clear audio
- ✅ Processing time: 10-30s per minute of audio
- ✅ Cost: ~$0.006/minute

### Grammar Analysis (spaCy)

- ✅ Tense accuracy: >85%
- ✅ Processing time: <1s per interpretation
- ✅ Error detection: >80% recall

### Medical NER (scispaCy)

- ✅ Entity recall: >90%
- ✅ UMLS linking accuracy: >85%
- ✅ Processing time: <2s per interpretation

### Feedback Generation (Claude)

- ✅ Response time: 3-8s
- ✅ Cost: $0.02-0.05 per feedback
- ✅ Feedback quality: Human-level insights

---

## 💡 Tips & Best Practices

### Notebook Organization

1. **Clear outputs before committing:**

   ```
   Cell → All Output → Clear
   ```

2. **Add markdown cells liberally:**
   - Explain your thinking
   - Document findings
   - Note issues and solutions

3. **Save intermediate results:**

   ```python
   # Save benchmark results
   results_df.to_csv('test_data/whisper_benchmarks.csv')
   ```

### Cost Management

1. **Start with small test sets:**
   - Test with 5-10 samples first
   - Scale up after validation

2. **Cache API responses:**

   ```python
   import json
   
   # Save to avoid re-calling API
   with open('test_data/cached_responses.json', 'w') as f:
       json.dump(responses, f)
   ```

3. **Monitor costs:**
   - Track token usage in notebooks
   - Calculate estimated production costs

### Performance Optimization

1. **Batch processing:**

   ```python
   # Process multiple texts at once
   docs = list(nlp.pipe(texts))
   ```

2. **Use appropriate model sizes:**
   - `en_core_web_sm` for testing
   - `en_core_web_lg` for production

3. **Profile slow operations:**

   ```python
   import time
   start = time.time()
   # ... operation ...
   print(f"Time: {time.time() - start:.2f}s")
   ```

---

## 🔍 Debugging Common Issues

### Jupyter Issues

**Kernel won't start:**

```powershell
# Reinstall kernel
python -m ipykernel install --user --name=interpretest
```

**Import errors:**

```powershell
# Verify virtual environment
.\venv\Scripts\Activate.ps1

# Reinstall packages
pip install -r requirements.txt
```

### spaCy Issues

**Model not found:**

```powershell
# Re-download model
python -m spacy download en_core_web_lg

# Verify installation
python -c "import spacy; nlp = spacy.load('en_core_web_lg'); print('✅ Model loaded')"
```

### API Issues

**Rate limiting:**

- Add delays between requests: `time.sleep(1)`
- Implement exponential backoff
- Use batch endpoints when available

**Authentication errors:**

- Verify `.env` file location
- Check API key format
- Test with minimal example

---

## 📝 Documentation

### What to Document

For each notebook, document:

1. **Test Results:**
   - Accuracy metrics
   - Performance benchmarks
   - Cost estimates

2. **Findings:**
   - What works well
   - What needs improvement
   - Edge cases discovered

3. **Code Patterns:**
   - Reusable functions
   - Successful prompts
   - Error handling strategies

### Create Summary Report

At the end of Phase 2, create: `notebooks/PHASE_2_SUMMARY.md`

Include:

- ✅ Achievements
- 📊 Benchmark results
- 💰 Cost analysis
- 🚀 Recommendations for Phase 3
- ⚠️ Issues encountered
- 📋 Next steps

---

## 🎓 Learning Resources

### spaCy

- [spaCy 101 Guide](https://spacy.io/usage/spacy-101)
- [Linguistic Features](https://spacy.io/usage/linguistic-features)
- [Spanish Models](https://spacy.io/models/es)

### scispaCy

- [scispaCy Documentation](https://allenai.github.io/scispacy/)
- [Entity Linking](https://allenai.github.io/scispacy/#entity-linking)
- [UMLS Concepts](https://www.nlm.nih.gov/research/umls/index.html)

### Claude 3.5 Sonnet

- [Claude API Documentation](https://docs.anthropic.com/claude/reference)
- [Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)
- [Best Practices](https://docs.anthropic.com/claude/docs/best-practices)

### Medical Interpretation

- [NBCMI Standards](https://www.certifiedmedicalinterpreters.org/)
- [CCHI Requirements](https://cchicertification.org/)
- [Medical Terminology Resources](https://www.nlm.nih.gov/medlineplus/medicalterminology.html)

---

## ✅ Phase 2 Completion Checklist

Before moving to Phase 3, ensure:

- [ ] All 4 notebooks completed and tested
- [ ] Whisper transcription working with test audio
- [ ] spaCy grammar analysis benchmarked
- [ ] scispaCy medical NER validated
- [ ] Claude feedback generation tested
- [ ] Accuracy metrics documented
- [ ] Cost estimates calculated
- [ ] Successful patterns identified
- [ ] Code ready for productionization
- [ ] Phase 2 summary report created
- [ ] Test data organized and saved
- [ ] API keys secured and tested

---

## 🚀 Next: Phase 3 - Productionization

Once Phase 2 is complete, you'll move successful patterns from notebooks to production code:

1. **Create NLP modules** (`app/nlp/`)
   - `transcription.py` - Whisper integration
   - `grammar_analyzer.py` - spaCy analysis
   - `medical_ner.py` - scispaCy entity recognition

2. **Create LLM modules** (`app/llm/`)
   - `claude_feedback.py` - Feedback generation
   - `prompt_templates.py` - Optimized prompts

3. **Build API endpoints** (`app/api/`)
   - `/api/analyze/audio` - Full analysis pipeline
   - `/api/feedback/generate` - Generate feedback

4. **Add tests** (`tests/`)
   - Unit tests for each module
   - Integration tests for full pipeline

**See:** `.kiro/specs/llm-backend-integration/tasks.md` for full Phase 3 plan.

---

## 🆘 Support

If you encounter issues:

1. Check `notebooks/README.md` for troubleshooting
2. Review `.env.example` for required environment variables
3. Verify virtual environment is activated
4. Check model installation: `python -m spacy validate`

**Need help?** Open an issue or contact the team.

---

**Good luck with Phase 2! 🚀**
