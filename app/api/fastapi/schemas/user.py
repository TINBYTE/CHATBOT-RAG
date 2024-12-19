from pydantic import BaseModel, EmailStr

# Schema for User Signup
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# Schema for User Login
class UserLogin(BaseModel):
    username: str
    password: str

# Schema for User Response
class UserResponse(BaseModel):
    username: str
    email: str
    class Config:
        orm_mode = True
