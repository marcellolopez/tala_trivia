# app/crud/participations.py
from sqlalchemy.orm import Session
from sqlalchemy import func, case, desc
from app.models.participation import TriviaParticipation
from app.models.question import Question
from app.schemas.participation import ParticipationCreate
from app.models.user import User

# --------------------------------------------
# Registra una respuesta de un usuario para una pregunta en una trivia.
# Evalúa si la respuesta es correcta y guarda la participación en la base de datos.
def submit_answer(db: Session, data: ParticipationCreate):
    # Se busca la pregunta asociada al ID recibido
    question = db.query(Question).filter(Question.id == data.question_id).first()

    # Se compara la opción seleccionada con la correcta
    is_correct = question.correct_option == data.answer

    # Se crea una instancia de participación
    participation = TriviaParticipation(
        user_id=data.user_id,
        trivia_id=data.trivia_id,
        question_id=data.question_id,
        answer=data.answer,
        is_correct=is_correct
    )

    # Se guarda en la base de datos
    db.add(participation)
    db.commit()
    db.refresh(participation)

    return participation


# --------------------------------------------
# Retorna todas las participaciones de un usuario en una trivia específica.
# Útil para mostrar el historial de respuestas.
def get_user_participations(db: Session, user_id: int, trivia_id: int):
    return db.query(TriviaParticipation).filter_by(user_id=user_id, trivia_id=trivia_id).all()


# --------------------------------------------
# Calcula el ranking de usuarios para una trivia según sus respuestas correctas.
# Se asignan puntajes distintos según la dificultad de cada pregunta.
def get_trivia_ranking(db: Session, trivia_id: int):
    participations = (
        db.query(
            User.id.label("user_id"),
            User.name.label("name"),
            func.sum(
                case(
                    # Puntaje por dificultad si la respuesta fue correcta
                    ( (TriviaParticipation.is_correct == True) & (Question.difficulty == "easy"), 1 ),
                    ( (TriviaParticipation.is_correct == True) & (Question.difficulty == "medium"), 2 ),
                    ( (TriviaParticipation.is_correct == True) & (Question.difficulty == "hard"), 3 ),
                    else_=0
                )
            ).label("score")
        )
        .join(User, TriviaParticipation.user_id == User.id)
        .join(Question, TriviaParticipation.question_id == Question.id)
        .filter(TriviaParticipation.trivia_id == trivia_id)
        .group_by(User.id)
        .order_by(desc("score"))  # Orden descendente por puntaje
        .all()
    )
    return participations
