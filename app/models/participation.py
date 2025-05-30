# app/models/participations.py
from sqlalchemy import Column, Integer, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class TriviaParticipation(Base):
    __tablename__ = "participations"

    id = Column(Integer, primary_key=True, index=True)

    # Relaciones hacia entidades externas
    user_id = Column(Integer, ForeignKey("users.id"))
    trivia_id = Column(Integer, ForeignKey("trivias.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))

    # Respuesta del usuario
    answer = Column(Integer)
    is_correct = Column(Boolean)

    # Timestamp de creación para identificar cuándo finalizó cada trivia
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relaciones ORM para facilitar el acceso a datos relacionados
    user = relationship("User")
    trivia = relationship("Trivia")
    question = relationship("Question")
