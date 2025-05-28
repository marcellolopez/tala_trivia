from sqlalchemy.orm import Session
from app.models.question import Question
from app.schemas.question import QuestionCreate

# --------------------------------------------
# Crea una nueva pregunta en la base de datos.
# Recibe un objeto del tipo QuestionCreate y lo convierte en un modelo ORM.
def create_question(db: Session, question: QuestionCreate):
    db_question = Question(**question.dict())  # Se convierte el schema Pydantic a modelo SQLAlchemy
    db.add(db_question)                        # Se agrega al contexto de la sesión
    db.commit()                                # Se guarda en la base de datos
    db.refresh(db_question)                    # Se actualiza la instancia con los datos finales
    return db_question

# --------------------------------------------
# Obtiene una lista de preguntas con soporte para paginación.
# Ideal para listar en frontend o API sin sobrecargar la respuesta.
def get_questions(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Question).offset(skip).limit(limit).all()
