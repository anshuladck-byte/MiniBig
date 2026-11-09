
import os
import jwt

from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash


# Password hashing using Argon2
password_hash = PasswordHash.recommended()

# JWT configuration
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "development-secret-change-before-deployment"
)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    return password_hash.verify(
        plain_password,
        hashed_password
    )


def create_access_token(usn: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": usn,
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        usn = payload.get("sub")

        if not usn:
            return None

        return usn

    except jwt.InvalidTokenError:
        return None