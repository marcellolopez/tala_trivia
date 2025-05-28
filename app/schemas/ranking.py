from pydantic import BaseModel

# ------------------------------------------------------------
# Esquema utilizado para representar el puntaje de un usuario
# en el ranking de una trivia.
class UserScore(BaseModel):
    user_id: int
    name: str
    score: int
