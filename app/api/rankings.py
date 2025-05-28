from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.schemas.ranking import UserScore
from app.crud.participation import get_trivia_ranking
from app.core.database import SessionLocal

router = APIRouter()

# Dependencia para obtener conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para listar el ranking
@router.get("/trivia/{trivia_id}", response_model=List[UserScore])
def ranking(trivia_id: int, db: Session = Depends(get_db)):
    return get_trivia_ranking(db, trivia_id)
