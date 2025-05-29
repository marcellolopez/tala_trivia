from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

DATABASE_URL = "sqlite:///./tala_trivia.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ------------------------------------------------------------
# Dependencia que se utiliza en los endpoints para obtener una sesión de BD
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
