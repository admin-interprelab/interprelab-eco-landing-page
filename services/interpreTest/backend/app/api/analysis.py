from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.ai_service import ai_service

router = APIRouter(prefix="/analysis", tags=["analysis"])

class TextAnalysisRequest(BaseModel):
    text: str
    context: str | None = None

class AnalysisResponse(BaseModel):
    results: dict

@router.post("/text", response_model=AnalysisResponse)
async def analyze_text(request: TextAnalysisRequest):
    """
    Analyze text for grammatical correctness using Gemini.
    """
    if not request.text:
        raise HTTPException(status_code=400, detail="Text is required")
    
    result = await ai_service.analyze_text(request.text)
    
    if "error" in result:
         # Log internal errors but maybe return 500 or 503 depending on cause?
         # For now letting it return as part of response for debugging
         pass

    return AnalysisResponse(results=result)

@router.get("/health")
async def check_ai_health():
    return {
        "gemini": ai_service.gemini_configured,
        "spacy": ai_service.nlp is not None
    }
