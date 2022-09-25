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
    project_creator_id = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="SET NULL"), nullable=False)
    project_start_date = Column(TIMESTAMP(timezone=True),
                                nullable=False, server_default=text("now()"))
    project_end_date = Column(TIMESTAMP(timezone=True),
                              nullable=True)
    # board_id = ...


class UsersProjectsMap(Base):
    __tablename__ = "users_projects_map"

    pass


class Boards(Base):
    __tablename__ = "boards"

    board_id = Column(BigInteger, primary_key=True, nullable=False)
    board_name = Column(String, nullable=False)
    project_id = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="CASCADE"), nullable=False)
    board_creator_id = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="CASCADE"), nullable=False)


class Tickets(Base):
    __tablename__ = "tickets"

    ticket_id = Column(BigInteger, primary_key=True, nullable=False)
    ticket_name = Column(String, nullable=False)
    ticket_creator_id = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="SET NULL"), nullable=True)
    ticket_creation_date = Column(TIMESTAMP(timezone=True),
                                  nullable=False, server_default=text("now()"))
    ticket_column_id = Column(BigInteger, ForeignKey(
        "columns.column_id", ondelete="SET NULL"), nullable=True)
    assignee_id = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="SET NULL"), nullable=True)


class Columns(Base):
    __tablename__ = "columns"

    column_id = Column(BigInteger, primary_key=True, nullable=False)
    column_name = Column(String, nullable=False)
    board_id = Column(BigInteger, ForeignKey(
        "boards.board_id", ondelete="CASCADE"), nullable=False)


class Tables(Base):
    __tablename__ = "tables"

    pass
