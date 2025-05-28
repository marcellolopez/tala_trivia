from fastapi import FastAPI
from app.core.database import Base, engine
from app.models import user, question, trivia, participation

from app.api import users, questions, trivias, participations, rankings

app = FastAPI(title="TalaTrivia API")

# Registrar routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(questions.router, prefix="/questions", tags=["Questions"])
app.include_router(trivias.router, prefix="/trivias", tags=["Trivias"])
app.include_router(participations.router, prefix="/participations", tags=["Participations"])
app.include_router(rankings.router, prefix="/ranking", tags=["Ranking"])


# Crear las tablas al iniciar la app
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Bienvenido a TalaTrivia"}
