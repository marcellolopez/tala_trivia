# app/crud/user.py

from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.schemas.user import UserCreate
from app.core.auth import get_password_hash

# --------------------------------------------
# Crea un nuevo usuario en la base de datos, hasheando su contraseña
# y asignándole el role que venga en el schema (por defecto "player").
def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role  # <-- Aquí asignamos el role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --------------------------------------------
# Recupera una lista de usuarios con soporte para paginación.
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()
