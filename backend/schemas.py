
from pydantic import BaseModel, Field


class StudentRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    usn: str = Field(min_length=5, max_length=30)
    email: str = Field(
        pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    )
    phone: str = Field(
        pattern=r"^[0-9]{10,15}$"
    )
    branch: str
    semester: int = Field(ge=1, le=8)
    section: str
    password: str = Field(min_length=8, max_length=128)


class StudentLogin(BaseModel):
    usn: str
    password: str
