from sqlalchemy import Column, Integer, String
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    # Identificador único del usuario
    id = Column(Integer, primary_key=True, index=True)

    # Nombre del usuario
    name = Column(String, nullable=False)

    # Correo electrónico del usuario (debe ser único)
    email = Column(String, unique=True, index=True, nullable=False)

    # Columna para almacenar el hash de la contraseña
    password = Column(String, nullable=False)
