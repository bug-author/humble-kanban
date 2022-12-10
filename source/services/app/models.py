from sqlalchemy import Column, BigInteger, String, Boolean, ForeignKey, Integer, Table
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship
from .database import Base


users_projects_association = Table('UsersProjectsMap', Base.metadata,
                                   Column('user_id', ForeignKey(
                                       'users.user_id'), primary_key=True),
                                   Column('project_id', ForeignKey(
                                       'projects.project_id'), primary_key=True)
                                   )


class Users(Base):
    __tablename__ = "users"

    user_id = Column(BigInteger, primary_key=True, nullable=False)
    user_name = Column(String, nullable=False)
    display_name = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)

    # ==== #
    last_login = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))

    is_active = Column(Boolean, server_default="TRUE")
    is_deleted = Column(Boolean, server_default="FALSE", nullable=False)

    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))

    projects = relationship(
        'Projects', secondary=users_projects_association, back_populates='users')


class Projects(Base):
    __tablename__ = "projects"

    project_id = Column(BigInteger, primary_key=True, nullable=False)
    project_name = Column(String, nullable=False)
    project_creator_id = Column(BigInteger, ForeignKey(
        "users.user_id", ondelete="SET NULL"), nullable=True)
    project_start_date = Column(TIMESTAMP(timezone=True),
                                nullable=False, server_default=text("now()"))
    project_end_date = Column(TIMESTAMP(timezone=True),
                              nullable=True)

    users = relationship(
        'Users', secondary=users_projects_association, back_populates='projects')


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


columns_flow_association = Table('ColumnsFlow', Base.metadata,
                                 Column('from_column_id', ForeignKey(
                                     'columns.column_id'), primary_key=True),
                                 Column('to_column_id', ForeignKey(
                                     'columns.column_id'), primary_key=True)
                                 )


class Columns(Base):
    __tablename__ = "columns"

    column_id = Column(BigInteger, primary_key=True, nullable=False)
    column_name = Column(String, nullable=False)
    board_id = Column(BigInteger, ForeignKey(
        "boards.board_id", ondelete="CASCADE"), nullable=False)

    columns_flow = relationship(
        'Columns', secondary=columns_flow_association, back_populates='columns')
