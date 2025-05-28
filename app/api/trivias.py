from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.trivia import TriviaCreate, TriviaOut
from app.crud import trivia as crud_trivia
from app.core.database import SessionLocal

router = APIRouter()

# Dependencia para obtener conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para crear una nueva trivia
@router.post("/", response_model=TriviaOut)
def create_trivia(trivia: TriviaCreate, db: Session = Depends(get_db)):
    return crud_trivia.create_trivia(db, trivia)

# Endpoint para listar trivias
@router.get("/", response_model=list[TriviaOut])
def list_trivias(db: Session = Depends(get_db)):
    return crud_trivia.get_trivias(db)
