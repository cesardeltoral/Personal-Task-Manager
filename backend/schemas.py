from pydantic import BaseModel
from typing import Optional, List
import datetime


class TaskBase(BaseModel):
    title: str


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    tasks: List[Task] = []

    class Config:
        from_attributes = True


class TokenData(BaseModel):
    email: Optional[str] = None
