# app/models/user.py

import enum
from sqlalchemy import Column, Integer, String, Enum
from app.core.database import Base

class UserRole(enum.Enum):
    admin = "admin"
    player = "player"

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

    # Nuevo campo: rol del usuario (admin o player)
    role = Column(
        Enum(UserRole, name="user_role_enum"),
        nullable=False,
        default=UserRole.player,
        server_default=UserRole.player.value
    )

    def __repr__(self):
        return f"<User id={self.id} email={self.email} role={self.role.value}>"
