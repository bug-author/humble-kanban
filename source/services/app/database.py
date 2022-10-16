from sqlalchemy.ext.declarative import declarative_base
from .config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DB_URI = f"postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_portnumber}/{settings.database_name}"

engine = create_engine(SQLALCHEMY_DB_URI)

LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()
