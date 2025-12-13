from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional, List
from app.llm.generators import generate_quiz, generate_mnemonic, Quiz, MnemonicInsight
import logging

router = APIRouter(prefix="/study", tags=["study"])
logger = logging.getLogger(__name__)

# --- Request Models ---

class GenerateQuizRequest(BaseModel):
    topic: str
    difficulty: str = "intermediate"
    count: int = 5

class GenerateMnemonicRequest(BaseModel):
    term: str
    context: str = ""

# --- Endpoints ---

@router.post("/quiz/generate", response_model=Quiz)
async def create_quiz(request: GenerateQuizRequest):
    """
    Generate a quiz on a specific topic.
    """
    try:
        quiz = await generate_quiz(request.topic, request.difficulty, request.count)
        return quiz
    except ValueError as e:
        # Likely missing API key
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Quiz generation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate quiz. Please try again.")

@router.post("/flashcards/insight", response_model=MnemonicInsight)
async def get_flashcard_insight(request: GenerateMnemonicRequest):
    """
    Generate mnemonic and etymology for a flashcard term.
    """
    try:
        insight = await generate_mnemonic(request.term, request.context)
        return insight
    except Exception as e:
        logger.error(f"Mnemonic generation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate insight.")
