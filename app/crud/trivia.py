from sqlalchemy.orm import Session
from app.models.trivia import Trivia
from app.models.question import Question
from app.models.user import User
from app.schemas.trivia import TriviaCreate

# --------------------------------------------
# Crea una nueva trivia en la base de datos.
# Se asocian preguntas y usuarios mediante sus IDs.
def create_trivia(db: Session, trivia: TriviaCreate):
    db_trivia = Trivia(
        name=trivia.name,                      # Nombre de la trivia
        description=trivia.description         # Descripción opcional
    )

    # Asociar preguntas a la trivia usando sus IDs
    db_trivia.questions = db.query(Question).filter(Question.id.in_(trivia.question_ids)).all()

    # Asociar usuarios a la trivia usando sus IDs
    db_trivia.users = db.query(User).filter(User.id.in_(trivia.user_ids)).all()

    db.add(db_trivia)     # Se agrega a la sesión
    db.commit()           # Se guarda en la base de datos
    db.refresh(db_trivia) # Se actualiza con los datos definitivos
    return db_trivia

# --------------------------------------------
# Recupera todas las trivias existentes en la base de datos.
# No incluye paginación, retorna lista completa.
def get_trivias(db: Session):
    return db.query(Trivia).all()
