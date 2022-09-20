from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)

    # ==== #
    last_login = Column(TIMESTAMP(timezone=True))
    is_active = Column(Boolean, server_default='TRUE')
    is_deleted = Column(Boolean, server_default='FALSE', nullable=False)
