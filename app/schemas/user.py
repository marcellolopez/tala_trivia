# app/schemas/user.py

from enum import Enum
from pydantic import BaseModel, EmailStr

class UserRole(str, Enum):
    admin = "admin"
    player = "player"

# ------------------------------------------------------------
# Esquema base que contiene los campos comunes del usuario
class UserBase(BaseModel):
    name: str
    email: EmailStr

# ------------------------------------------------------------
# Esquema utilizado para la creación de un nuevo usuario (entrada POST)
class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.player

# ------------------------------------------------------------
# Esquema utilizado para autenticación (login)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ------------------------------------------------------------
# Esquema para mostrar información de usuario (salida GET)
class UserOut(UserBase):
    id: int
    role: UserRole

    class Config:
        from_attributes = True
