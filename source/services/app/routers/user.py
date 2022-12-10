from fastapi import FastAPI, status, Response, APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, data_transfer_objects as dto, utilities

router = APIRouter(
    prefix='/users',
    # for docs
    tags=['Users']
)


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=dto.UsersOut)
def create_user(user: dto.UsersCreate, db: Session = Depends(get_db)):

    hashed_password = utilities.hash(user.password)
    user.password = hashed_password

    new_user = models.Users(**user.dict())
    db.add(new_user)
    db.commit()
    # get an updated version of object for current session
    db.refresh()

    # this will return the new_user as per the structure of UsersOut dto
    return new_user
