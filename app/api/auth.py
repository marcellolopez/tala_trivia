# app/api/auth.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate, UserLogin, UserOut
from app.core.auth import verify_password, create_access_token
from app.core.database import get_db
from app.crud import user as crud_user

router = APIRouter(tags=["auth"])

@router.post(
    "/register",
    response_model=UserOut,
    summary="Registrar usuario",
    description="Crea un usuario con nombre, email, password y role (por defecto player)."
)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # 1) Verificar que no exista otro email
    if crud_user.get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    # 2) Crear usuario (usa create_user de crud, que ahora maneja role)
    new_user = crud_user.create_user(db, user_data)
    return new_user

@router.post(
    "/login",
    summary="Iniciar sesión y obtener token JWT",
    response_model=dict[str, str]
)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, login_data.email)
    if not user:
        # Usuario no existe
        raise HTTPException(status_code=404, detail="Usuario no registrado")
    if not verify_password(login_data.password, user.password):
        # Contraseña incorrecta
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}
