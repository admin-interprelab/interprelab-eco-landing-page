from typing import List, Optional
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
import os
import json
import logging

logger = logging.getLogger(__name__)

# --- Pydantic Models for Structured Output ---

class QuizQuestion(BaseModel):
    id: int = Field(description="Unique identifier for the question")
    question: str = Field(description="The question text")
    options: List[str] = Field(description="List of 4 possible answers")
    correct_answer: str = Field(description="The correct answer text (must effectively match one of the options)")
    explanation: str = Field(description="Explanation of why the answer is correct")

class Quiz(BaseModel):
    title: str = Field(description="Title of the quiz")
    questions: List[QuizQuestion] = Field(description="List of quiz questions")

class MnemonicInsight(BaseModel):
    etymology: str = Field(description="1-sentence etymology/origin of the term")
    mnemonic: str = Field(description="Short, funny or memorable mnemonic")

# --- Generators ---

def get_llm():
    """Get the configured LLM instance."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key or "placeholder" in api_key:
        raise ValueError("OPENAI_API_KEY not set properly.")
    
    return ChatOpenAI(
        model="gpt-3.5-turbo-0125", # Use 3.5 for speed/cost, or gpt-4-turbo for better quality
        temperature=0.7,
        api_key=api_key
    )

async def generate_quiz(topic: str, difficulty: str = "intermediate", count: int = 5) -> Quiz:
    """Generate a quiz based on a topic."""
    llm = get_llm()
    parser = JsonOutputParser(pydantic_object=Quiz)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are an expert medical interpreter trainer. Create a quiz to test knowledge of medical terminology and interpreting concepts."),
        ("user", "Create a {difficulty} level quiz with {count} questions about: {topic}.\nFormatting Instructions:\n{format_instructions}")
    ])

    chain = prompt | llm | parser

    try:
        result = await chain.ainvoke({
            "topic": topic,
            "difficulty": difficulty,
            "count": count,
            "format_instructions": parser.get_format_instructions()
        })
        return Quiz(**result)
    except Exception as e:
        logger.error(f"Error generating quiz: {e}")
        # Fallback for resiliency (could return empty quiz or retry)
        raise e

async def generate_mnemonic(term: str, context: str = "") -> MnemonicInsight:
    """Generate etymology and mnemonic for a medical term."""
    llm = get_llm()
    parser = JsonOutputParser(pydantic_object=MnemonicInsight)

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a creative medical educator specialized in mnemonics and etymology."),
        ("user", "For the medical term/root '{term}' (Context: {context}):\n1. Provide a 1-sentence etymology.\n2. Create a short, funny or memorable mnemonic.\n\n{format_instructions}")
    ])
    
    chain = prompt | llm | parser

    try:
        result = await chain.ainvoke({
            "term": term,
            "context": context,
            "format_instructions": parser.get_format_instructions()
        })
        return MnemonicInsight(**result)
    except Exception as e:
        logger.error(f"Error generating mnemonic: {e}")
        raise e
