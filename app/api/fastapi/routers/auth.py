from fastapi import APIRouter, HTTPException
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.utils.auth_utils import hash_password, verify_password
from app.utils.jwt_utils import create_access_token
from pymongo.errors import DuplicateKeyError
from app.database import users_collection

router = APIRouter()

# Signup endpoint
@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    try:
        hashed_password = hash_password(user.password)
        new_user = {
            "username": user.username,
            "email": user.email,
            "hashed_password": hashed_password,
        }
        await users_collection.insert_one(new_user)
        return UserResponse(username=user.username, email=user.email)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=400, detail="Username or email already exists."
        )

# Login endpoint
@router.post("/login")
async def login(user: UserLogin):
    stored_user = await users_collection.find_one({"username": user.username})
    if not stored_user:
        raise HTTPException(status_code=404, detail="User not found.")

    if not verify_password(user.password, stored_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid password.")

    token = create_access_token({"sub": stored_user["username"]})
    return {"access_token": token, "token_type": "bearer"}
