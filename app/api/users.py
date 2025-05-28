from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserOut
from app.crud import user as crud_user
from app.core.database import SessionLocal

router = APIRouter()

# Dependencia para obtener conexión a la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para crear un usuario
@router.post("/", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud_user.create_user(db, user)

# Endpoint para listar usuarios (Con paginación)
@router.get("/", response_model=list[UserOut])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_user.get_users(db, skip=skip, limit=limit)
