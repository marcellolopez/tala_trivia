# app/main.py

from fastapi import FastAPI
from app.core.database import Base, engine
from app.api import users, questions, trivias, participations, rankings, auth

app = FastAPI(title="TalaTrivia API")

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(questions.router, prefix="/questions", tags=["Questions"])
app.include_router(trivias.router, prefix="/trivias", tags=["Trivias"])
# El router internal en participations.py ya no tiene prefix, así que montamos aquí
app.include_router(participations.router, prefix="/participations", tags=["Participations"])
# Igualmente para ranking:
app.include_router(rankings.router, prefix="/ranking", tags=["Ranking"])
app.include_router(auth.router, tags=["Auth"])

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Bienvenido a TalaTrivia"}
