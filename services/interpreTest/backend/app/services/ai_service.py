import google.generativeai as genai
from app.config import settings
import logging

try:
    import spacy
    SPACY_AVAILABLE = True
except ImportError:
    SPACY_AVAILABLE = False

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.gemini_configured = False
        self.nlp = None
        
        # Initialize Gemini
        if settings.GEMINI_API_KEY:
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.model = genai.GenerativeModel('gemini-1.5-pro')
                self.gemini_configured = True
                logger.info("Gemini 1.5 Pro initialized successfully.")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini: {e}")
        else:
            logger.warning("GEMINI_API_KEY not found. AI features will be disabled.")

        # Initialize SpaCy
        if SPACY_AVAILABLE:
            try:
                # simple load for now, can be upgraded to 'en_core_web_trf' for accuracy
                self.nlp = spacy.load("en_core_web_sm") 
                logger.info("SpaCy (en_core_web_sm) initialized successfully.")
            except OSError:
                logger.warning("SpaCy model not found. Downloading...")
                try:
                    from spacy.cli import download
                    download("en_core_web_sm")
                    self.nlp = spacy.load("en_core_web_sm")
                except Exception as e:
                     logger.warning(f"Failed to download/load SpaCy: {e}")
                     self.nlp = None
        else:
            logger.warning("SpaCy library not found (likely Python 3.13 incompatibility). NLP features disabled.")

    async def analyze_text(self, text: str) -> dict:
        if not self.gemini_configured:
            return {"error": "AI service not configured"}

        # Basic prompt for grammatical analysis
        prompt = f"""
        Analyze the following text for grammatical correctness and linguistic accuracy suitable for a professional medical interpreter.
        
        Text: "{text}"
        
        Provide response in JSON format with:
        - corrections: list of objects {{"original": str, "correction": str, "explanation": str}}
        - overall_score: int (0-100)
        - feedback: string summary
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Simple cleanup to ensure valid JSON parsing if model wraps in markdown
            if response.text:
                text_response = response.text.replace('```json', '').replace('```', '').strip()
                return {"raw_analysis": text_response}
            else:
                return {"error": "Empty response from Gemini"}
        except Exception as e:
            logger.error(f"Error during analysis: {e}")
            # If Gemini fails, we might fallback to Spacy if available (not implemented yet)
            return {"error": str(e)}

ai_service = AIService()
