from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.participation import ParticipationCreate, ParticipationOut
from app.crud import participation as crud_participation
from app.core.database import SessionLocal
from app.core.database import get_db

router = APIRouter()

# Endpoint para guardar participación 
@router.post("/", response_model=ParticipationOut)
def submit_response(data: ParticipationCreate, db: Session = Depends(get_db)):
    return crud_participation.submit_answer(db, data)
