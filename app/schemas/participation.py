from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# ------------------------------------------------------------
# Esquema para la creación de una participación.
class ParticipationCreate(BaseModel):
    user_id: int
    trivia_id: int
    question_id: int
    answer: int = Field(..., ge=1, le=4)

# ------------------------------------------------------------
# Esquema de salida que representa una participación completa.
class ParticipationOut(BaseModel):
    id: int
    user_id: int
    trivia_id: int
    question_id: int
    answer: int
    is_correct: bool

    class Config:
        from_attributes = True

# ------------------------------------------------------------
# Nuevo esquema: resumen de trivias contestadas por el usuario
class TriviaSummary(BaseModel):
    trivia_id: int
    trivia_name: str
    total_questions: int
    correct_answers: int
    finished_at: datetime

    class Config:
        from_attributes = True
