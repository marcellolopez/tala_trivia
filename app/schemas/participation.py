from pydantic import BaseModel, Field
from typing import Optional

# ------------------------------------------------------------
# Esquema para la creación de una participación.
# Representa la respuesta de un usuario a una pregunta en una trivia.
class ParticipationCreate(BaseModel):
    user_id: int
    trivia_id: int
    question_id: int
    answer: int = Field(..., ge=1, le=4)

# ------------------------------------------------------------
# Esquema de salida que representa una participación completa,
# incluyendo si la respuesta fue correcta.
class ParticipationOut(BaseModel):
    id: int
    user_id: int
    trivia_id: int
    question_id: int
    answer: int
    is_correct: bool

    class Config:
        from_attributes = True
