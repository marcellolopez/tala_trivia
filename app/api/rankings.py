from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.ranking import UserScore
from app.crud.participation import get_trivia_ranking
from app.core.database import SessionLocal
from app.core.database import get_db

router = APIRouter()

# Endpoint para listar el ranking
@router.get("/trivia/{trivia_id}", response_model=List[UserScore])
def ranking(trivia_id: int, db: Session = Depends(get_db)):
    return get_trivia_ranking(db, trivia_id)
