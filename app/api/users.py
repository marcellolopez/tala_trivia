from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserOut
from app.crud import user as crud_user
from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter()

# ------------------------------------------------------------
# Devuelve la lista de usuarios registrados (requiere autenticación)
@router.get("/", response_model=list[UserOut], summary="Listar usuarios", description="Requiere autenticación. Retorna la lista de usuarios registrados con paginación.")
def read_users(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return crud_user.get_users(db, skip=skip, limit=limit)
