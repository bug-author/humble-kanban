from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# isnt required if alembic is used for db creation and migrations

# from .database import engine
# from . import models
# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {'message': 'Hello, world!'}
