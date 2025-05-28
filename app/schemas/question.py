from pydantic import BaseModel, Field

# ------------------------------------------------------------
# Esquema base que define los atributos comunes de una pregunta.
# Se reutiliza en los esquemas de creación y respuesta.
class QuestionBase(BaseModel):
    text: str
    difficulty: str = Field(..., pattern="^(easy|medium|hard)$")
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: int = Field(..., ge=1, le=4)

# ------------------------------------------------------------
# Esquema utilizado para crear una pregunta.
class QuestionCreate(QuestionBase):
    pass

# ------------------------------------------------------------
# Esquema utilizado para devolver los datos de una pregunta.
class QuestionOut(QuestionBase):
    id: int

    class Config:
        from_attributes = True
