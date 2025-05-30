# app/api/participations.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case, desc

from app.schemas.participation import (
    ParticipationCreate,
    ParticipationOut,
    TriviaSummary,
)
from app.crud.participation import submit_answer
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.participation import TriviaParticipation
from app.models.trivia import Trivia
from app.models.user import User

router = APIRouter(tags=["participations"])

@router.post(
    "/",
    response_model=ParticipationOut,
    summary="Submit a single participation"
)
def submit_response(
    data: ParticipationCreate,
    db: Session = Depends(get_db)
):
    return submit_answer(db, data)

@router.get(
    "/me/summary",
    response_model=list[TriviaSummary],
    summary="Get summary of trivias answered by current user"
)
def get_my_trivia_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Agrupa las participaciones del usuario actual por trivia.
    Cada fila contiene:
      - trivia_id
      - trivia_name
      - total_questions (número de preguntas contestadas en esa trivia)
      - correct_answers (suma de is_correct)
      - finished_at (timestamp de la última respuesta en esa trivia)
    """
    # SQLAlchemy.case ya no acepta una lista de whens; usamos positional args:
    rows = (
        db.query(
            TriviaParticipation.trivia_id,
            Trivia.name.label("trivia_name"),
            func.count(TriviaParticipation.question_id).label("total_questions"),
            # Aquí corregimos el case: usamos positional in lugar de lista de tuplas
            func.sum(
                case(
                    (TriviaParticipation.is_correct == True, 1),
                    else_=0
                )
            ).label("correct_answers"),
            func.max(TriviaParticipation.created_at).label("finished_at"),
        )
        .join(Trivia, TriviaParticipation.trivia_id == Trivia.id)
        .filter(TriviaParticipation.user_id == current_user.id)
        .group_by(TriviaParticipation.trivia_id, Trivia.name)
        .all()
    )

    return [
        TriviaSummary(
            trivia_id=r.trivia_id,
            trivia_name=r.trivia_name,
            total_questions=r.total_questions,
            correct_answers=r.correct_answers,
            finished_at=r.finished_at,
        )
        for r in rows
    ]
