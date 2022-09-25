from sqlalchemy import Column, BigInteger, String, Boolean, ForeignKey
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
    project_creator = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="CASCADE"), nullable=False)
    project_start_date = Column(TIMESTAMP(timezone=True),
                                nullable=False, server_default=text("now()"))
    project_end_date = Column(TIMESTAMP(timezone=True),
                              nullable=False)
    # board_id = ...


class Boards(Base):
    __tablename__ = "boards"

    board_id = Column(BigInteger, primary_key=True, nullable=False)
    board_name = Column(String, nullable=False)
    project_id = ...
    board_creator_id = ...


class Tickets(Base):
    __tablename__ = "tickets"

    ticket_id = Column(BigInteger, primary_key=True, nullable=False)
    ticket_name = Column(String, nullable=False)
    ticket_creator = ...
    ticket_creation_date = Column(TIMESTAMP(timezone=True),
                                  nullable=False, server_default=text("now()"))
    ticket_column_id = ...
    assignee_id = ...


class Columns(Base):
    __tablename__ = "columns"

    column_id = Column(BigInteger, primary_key=True, nullable=False)
    column_name = Column(String, nullable=False)
    board_id = ...


class Tables(Base):
    __tablename__ = "tables"

    pass
