from pydantic import BaseModel
from typing import List, Optional
from app.schemas.user import UserOut
from app.schemas.question import QuestionOut

# ------------------------------------------------------------
# Base común para representar una trivia con sus atributos principales
class TriviaBase(BaseModel):
    name: str
    description: Optional[str] = None

# ------------------------------------------------------------
# Esquema utilizado al momento de crear una trivia (entrada POST)
class TriviaCreate(TriviaBase):
    question_ids: List[int]
    user_ids: List[int]

# ------------------------------------------------------------
# Esquema para representar una trivia con sus relaciones (salida GET)
class TriviaOut(TriviaBase):
    id: int
    questions: List[QuestionOut]
    users: List[UserOut]

    class Config:
        from_attributes = True
