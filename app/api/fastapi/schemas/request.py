from pydantic import BaseModel

class QuestionRequest(BaseModel):
    query: str
    question_type: str  # "mcq" or "open-ended"
    question_nbr: int
    difficulty: str  # "beginner", "intermediate", or "advanced"
