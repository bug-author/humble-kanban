from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_portnumber: str
    database_password: str
    database_user: str
    database_username: str

    class Config:
        env_file = '.env'


settings = BaseSettings()
