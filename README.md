# TalaTrivia API

Una API construida con **FastAPI**, **SQLAlchemy** y **Docker** que permite crear y participar en trivias, registrar respuestas y obtener rankings por usuario.

---

## 📌 Tecnologías utilizadas

- Python 3.11+
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- SQLite (modo local)
- Uvicorn
- Docker + Docker Compose

---

## 🏁 Pasos para iniciar el proyecto

### 🔧 Opción 1: Entorno local (sin Docker)

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/usuario/tala_trivia.git
   cd tala_trivia
   ```

2. **Crear y activar entorno virtual:**

   - **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **Unix/Mac:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación:**
   ```bash
   uvicorn app.main:app --reload
   ```

5. **Acceder a la documentación automática:**
   ```bash
   http://localhost:8000/docs
   ```

🐳 **Opción 2: Usando Docker**

```bash
docker-compose up --build
```

Abrir en navegador:

```bash
http://localhost:8000
```

## 🗂️ Estructura del proyecto

```
tala_trivia/
├── app/
│   ├── api/                # Rutas agrupadas por recurso
│   ├── core/               # Configuración (base de datos)
│   ├── crud/               # Operaciones con la base de datos
│   ├── models/             # Modelos ORM con SQLAlchemy
│   ├── schemas/            # Validación de entrada/salida con Pydantic
│   └── main.py             # Punto de entrada principal de FastAPI
├── requirements.txt
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 🧪 Endpoints principales

- `POST /users/` → Crear usuario
- `POST /questions/` → Crear pregunta
- `POST /trivias/` → Crear trivia y asociar preguntas/usuarios
- `POST /participations/` → Registrar respuesta de usuario
- `GET /ranking/trivia/{id}` → Ranking de trivia
- `GET /trivias/` → Listar trivias

⚙️ **Alembic (migraciones de base de datos)**

Aún no implementado en este proyecto, pero se puede agregar así:

```bash
alembic init alembic
```

Luego editar `alembic.ini` y `env.py`, y utilizar:

```bash
alembic revision --autogenerate -m "create tables"
alembic upgrade head
```

## 📝 Notas

Las validaciones de entrada se manejan con Pydantic.

El esquema sigue principios de separación de capas (modelos, lógica de negocio, validación).

Usa SQLite por simplicidad, pero puede escalar a PostgreSQL fácilmente.

🔗 **Autor**  
Desarrollado como prueba técnica.  
Marcello L. - mlc74163322@gmail.com
