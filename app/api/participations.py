from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.participation import ParticipationCreate, ParticipationOut
from app.crud import participation as crud_participation
from app.core.database import SessionLocal

router = APIRouter()

# Dependencia para obtener conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para guardar participación 
@router.post("/", response_model=ParticipationOut)
def submit_response(data: ParticipationCreate, db: Session = Depends(get_db)):
    return crud_participation.submit_answer(db, data)
