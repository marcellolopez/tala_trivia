from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.database import SessionLocal
from app.schemas.token import TokenData

# Clave secreta para firmar el token (debería ir como variable de entorno en producción)
SECRET_KEY = "secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Configuración de encriptado
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Ruta por defecto para obtener el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# ------------------------------------------------------------
# Hashea una contraseña en texto plano
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


# ------------------------------------------------------------
# Verifica si una contraseña es válida comparando con el hash
def verify_password(plain_password: str, password: str) -> bool:
    return pwd_context.verify(plain_password, password)


# ------------------------------------------------------------
# Genera un token JWT con los datos indicados
def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# ------------------------------------------------------------
# Decodifica un token JWT y devuelve su contenido
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


# ------------------------------------------------------------
# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


