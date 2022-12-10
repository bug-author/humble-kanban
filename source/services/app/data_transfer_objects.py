from pydantic import EmailStr, BaseModel
from datetime import datetime


class UsersCreate(BaseModel):
    email: EmailStr
    user_name: str
    display_name: str
    password: str

    # relying on defaults for now
    # last_login
    # is_active
    # is_deleted
    # created_at

    # stuck on
    # projects


class UsersLogin(BaseModel):
    email: EmailStr
    password: str


class UsersOut(BaseModel):
    user_id: int
    email: EmailStr
    created_at: datetime

    # https://fastapi.tiangolo.com/tutorial/sql-databases/#use-pydantics-orm_mode
    # ? reduces the overhead of making orm compatible with pydantic by parsing etc
    class Config:
        orm_mode = True
