from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

# ------------------------------------------------------------
# Tabla intermedia para establecer la relación muchos a muchos
# entre trivias y preguntas.
trivia_questions = Table(
    "trivia_questions",
    Base.metadata,
    Column("trivia_id", ForeignKey("trivias.id"), primary_key=True),
    Column("question_id", ForeignKey("questions.id"), primary_key=True),
    extend_existing=True
)

# ------------------------------------------------------------
# Tabla intermedia para establecer la relación muchos a muchos
# entre trivias y usuarios.
trivia_users = Table(
    "trivia_users",
    Base.metadata,
    Column("trivia_id", ForeignKey("trivias.id"), primary_key=True),
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    extend_existing=True
)

# ------------------------------------------------------------
# Modelo que representa una trivia.
# Contiene su nombre, descripción y las relaciones con preguntas y usuarios.
class Trivia(Base):
    __tablename__ = "trivias"

    # Identificador único de la trivia
    id = Column(Integer, primary_key=True, index=True)

    # Nombre de la trivia
    name = Column(String, nullable=False)

    # Descripción opcional de la trivia
    description = Column(String, nullable=True)

    # Relación con las preguntas asociadas a esta trivia
    questions = relationship("Question", secondary=trivia_questions, backref="trivias")

    # Relación con los usuarios que participan en esta trivia
    users = relationship("User", secondary=trivia_users, backref="trivias")
