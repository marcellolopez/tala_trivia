from pydantic import BaseModel, EmailStr

# ------------------------------------------------------------
# Esquema base que contiene los campos comunes del usuario
class UserBase(BaseModel):
    name: str
    email: EmailStr

# ------------------------------------------------------------
# Esquema utilizado para la creación de un nuevo usuario (entrada POST)
class UserCreate(UserBase):
    password: str  

# ------------------------------------------------------------
# Esquema utilizado para autenticación (login)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ------------------------------------------------------------
# Esquema para mostrar información de usuario (salida GET)
class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True
