from sqlalchemy import Column, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base


class TriviaParticipation(Base):
    __tablename__ = "participations"  

    id = Column(Integer, primary_key=True, index=True)

    # Relaciones hacia entidades externas
    user_id = Column(Integer, ForeignKey("users.id"))
    trivia_id = Column(Integer, ForeignKey("trivias.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))

    answer = Column(Integer)
    is_correct = Column(Boolean)

    # Relaciones ORM para facilitar el acceso a datos relacionados
    user = relationship("User")
    trivia = relationship("Trivia")
    question = relationship("Question")
