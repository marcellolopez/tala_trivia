# TalaTrivia

Una plataforma de trivial construida con **FastAPI** (backend) y **React/Vite** (frontend), dockerizada.

---

## 📌 Tecnologías utilizadas

- **Backend:** Python 3.11+, FastAPI, SQLAlchemy, Pydantic, Uvicorn  
- **Frontend:** React, Vite, Bootstrap  
- **Infraestructura:** Docker, Docker Compose  
- **Base de datos:** SQLite (local)

---

## 🔧 Pasos para iniciar

### Opción 1: Docker Compose

```bash
docker-compose up --build
```

- Esto levantará el **backend** en `http://localhost:8000`.  
- **Importante:** actualmente el servicio frontend **no** ejecuta `npm run dev` automáticamente. Tras el `up`, abre otra terminal:

  ```bash
  cd frontend
  npm install
  npm run dev -- --host 0.0.0.0
  ```

  Luego visita la plataforma en `http://localhost:5173`.

### Opción 2: Entorno local (sin Docker)

#### Backend

```bash
# En la raíz del proyecto
python3 -m venv venv
source venv/bin/activate        # Unix/Mac
# venv\Scripts\activate      # Windows
pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Accede a la documentación Swagger en:

```
http://localhost:8000/docs
```

#### Frontend

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

Abre la aplicación en:

```
http://localhost:5173
```

---

## 🛠️ Creación de usuario **admin**

Antes de usar el **panel de administración**, crea un usuario con rol `admin` desde Swagger.


## 🌐 URLs importantes

- **Swagger (API docs):** `http://localhost:8000/docs`  
- **React/Vite:**            `http://localhost:5173`

---

## 📂 Estructura del proyecto

```
tala_trivia/
├── app/
│   ├── api/        # Rutas FastAPI
│   ├── core/       # Configuración y dependencias
│   ├── crud/       # Lógica de acceso a datos
│   ├── models/     # Modelos ORM
│   ├── schemas/    # Esquemas Pydantic
│   └── main.py     # Entrada de la aplicación
├── frontend/       # App React/Vite
├── Dockerfile      # Backend
├── docker-compose.yml
└── README.md       # Este archivo
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
