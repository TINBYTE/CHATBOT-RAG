from fastapi import APIRouter, HTTPException
from app.schemas.request import QuestionRequest
from app.schemas.response import QuestionResponse
from app.services.piepeline import exam_pipeline
from langchain_ollama import OllamaLLM
from app.utils.faiss_utils import load_faiss_index

router = APIRouter()

import os

base_dir = os.path.dirname(os.path.abspath(__file__))  # Current script directory
vectorstore_path = os.path.join(base_dir, "vector_database")

# Load the FAISS vector database
# save_path = "vector_database"

# Load FAISS index and Ollama model
faiss_index = load_faiss_index(vectorstore_path)
ollama_model = OllamaLLM(model="llama3.2")

@router.post("/generate-exam", response_model=QuestionResponse)
async def generate_exam(request: QuestionRequest):
    try:
        exam = exam_pipeline(
            query=request.query,
            question_type=request.question_type,
            question_nbr=request.question_nbr,
            faiss_index=faiss_index,
            ollama_model=ollama_model,
            difficulty=request.difficulty,
            k=25,  # Retrieved documents
            top_n=5  # Re-ranked documents
        )
        return {"questions": exam["questions"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))