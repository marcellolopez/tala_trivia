from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

# --------------------------------------------
# Crea un nuevo usuario en la base de datos.
# Recibe un esquema con los datos del usuario y lo persiste.
def create_user(db: Session, user: UserCreate):
    db_user = User(name=user.name, email=user.email)  # Crea instancia del modelo con datos del schema
    db.add(db_user)       # Agrega el usuario a la sesión
    db.commit()           # Confirma los cambios en la base de datos
    db.refresh(db_user)   # Refresca con los datos actualizados desde la BD
    return db_user

# --------------------------------------------
# Recupera una lista de usuarios con soporte para paginación.
# Parámetros: `skip` para omitir registros, `limit` para restringir cantidad.
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()
