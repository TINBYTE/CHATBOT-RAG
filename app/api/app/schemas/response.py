from pydantic import BaseModel
from typing import List, Dict

class QuestionResponse(BaseModel):
    questions: List[Dict]
