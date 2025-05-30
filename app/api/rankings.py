# app/api/ranking.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case, desc

from app.core.database import get_db
from app.models.participation import TriviaParticipation
from app.models.user import User
from pydantic import BaseModel

router = APIRouter(tags=["ranking"])

class GeneralRank(BaseModel):
    user_id: int
    user_name: str
    score: int

@router.get(
    "/general",
    response_model=list[GeneralRank],
    summary="Get general ranking of all users"
)
def ranking_general(
    db: Session = Depends(get_db)
):
    """
    Devuelve el ranking global de usuarios:
      - user_id
      - user_name
      - score (suma de respuestas correctas)
    El case() también se corrige para SQLAlchemy 2.x.
    """
    rows = (
        db.query(
            TriviaParticipation.user_id,
            User.name.label("user_name"),
            func.sum(
                case(
                    (TriviaParticipation.is_correct == True, 1),
                    else_=0
                )
            ).label("score")
        )
        .join(User, TriviaParticipation.user_id == User.id)
        .group_by(TriviaParticipation.user_id, User.name)
        .order_by(desc("score"))
        .all()
    )

    return [
        GeneralRank(
            user_id=r.user_id,
            user_name=r.user_name,
            score=r.score
        )
        for r in rows
    ]
