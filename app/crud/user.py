from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.auth import get_password_hash

# --------------------------------------------
# Crea un nuevo usuario en la base de datos, hasheando su contraseña.
def create_user(db: Session, user: UserCreate):
    password = get_password_hash(user.password)
    db_user = User(
        name=user.name,
        email=user.email,
        password=password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --------------------------------------------
# Recupera una lista de usuarios con soporte para paginación.
# Parámetros: `skip` para omitir registros, `limit` para restringir cantidad.
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()
