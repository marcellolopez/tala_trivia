from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)

    # Enunciado o texto principal de la pregunta
    text = Column(String, nullable=False)

    # Nivel de dificultad de la pregunta (ej: easy, medium, hard)
    difficulty = Column(String, nullable=False)

    # Opciones posibles para responder la pregunta
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)

    # Índice de la opción correcta (1 para A, 2 para B, etc.)
    correct_option = Column(Integer, nullable=False)
