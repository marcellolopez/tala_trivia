from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.trivia import TriviaCreate, TriviaOut
from app.crud import trivia as crud_trivia
from app.core.database import get_db
from app.models.user import User
from app.core.deps import get_current_user

router = APIRouter()

# Endpoint para crear una nueva trivia (requiere autenticación)
@router.post("/", response_model=TriviaOut)
def create_trivia(
    trivia: TriviaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_trivia.create_trivia(db, trivia)

# Endpoint para listar trivias (requiere autenticación)
@router.get("/", response_model=list[TriviaOut])
def list_trivias(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_trivia.get_trivias(db)
