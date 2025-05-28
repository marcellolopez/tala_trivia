from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.question import QuestionCreate, QuestionOut
from app.crud import question as crud_question
from app.core.database import SessionLocal

router = APIRouter()

# Dependencia para obtener conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para crear una nueva pregunta
@router.post("/", response_model=QuestionOut)
def create_question(question: QuestionCreate, db: Session = Depends(get_db)):
    return crud_question.create_question(db, question)

# Endpoint para listar todas las preguntas (Con paginación)
@router.get("/", response_model=list[QuestionOut])
def read_questions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_question.get_questions(db, skip=skip, limit=limit)
