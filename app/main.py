from fastapi import FastAPI, Depends
from fastapi.openapi.utils import get_openapi
from fastapi.security import OAuth2PasswordBearer

from app.core.database import Base, engine
from app.models import user, question, trivia, participation
from app.api import users, questions, trivias, participations, rankings, auth

app = FastAPI(title="TalaTrivia API")

# Routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(questions.router, prefix="/questions", tags=["Questions"])
app.include_router(trivias.router, prefix="/trivias", tags=["Trivias"])
app.include_router(participations.router, prefix="/participations", tags=["Participations"])
app.include_router(rankings.router, prefix="/ranking", tags=["Ranking"])
app.include_router(auth.router, tags=["Auth"])

# Crear tablas
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Bienvenido a TalaTrivia"}

# --------------------------
# 🔐 Swagger Auth Settings
# --------------------------

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="TalaTrivia API",
        version="1.0.0",
        description="API para gestionar trivias, usuarios y participación con autenticación JWT Bearer.",
        routes=app.routes,
    )

    # Define el esquema Bearer
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    # Aplica a todas las rutas
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
