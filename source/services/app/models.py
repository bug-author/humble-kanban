from sqlalchemy import Column, BigInteger, String, Boolean
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from database import Base


class Users(Base):
    __tablename__ = "users"

    user_id = Column(BigInteger, primary_key=True, nullable=False)
    display_name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)

    # ==== #
    last_login = Column(TIMESTAMP(timezone=True))
    is_active = Column(Boolean, server_default="TRUE")
    is_deleted = Column(Boolean, server_default="FALSE", nullable=False)

    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))


class Projects(Base):
    __tablename__ = "projects"

    project_id = Column(BigInteger, primary_key=True, nullable=False)
    project_name = Column(String, nullable=False)
    project_creator = ...
    project_start_date = Column(TIMESTAMP(timezone=True),
                                nullable=False, server_default=text("now()"))
    project_end_date = Column(TIMESTAMP(timezone=True),
                              nullable=False)
    board_id = ...
