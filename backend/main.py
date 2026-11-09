
import sqlite3

from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware

from database import get_connection, initialize_database
from schemas import StudentRegister, StudentLogin
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    verify_access_token
)


app = FastAPI(title="Campus Ecosystem API")
security = HTTPBearer()

# Allow the React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    initialize_database()


@app.get("/")
def home():
    return {"message": "Campus API is running"}


# STUDENT REGISTRATION
@app.post("/register")
def register_student(student: StudentRegister):

    connection = get_connection()

    try:
        connection.execute(
            """
            INSERT INTO students (
                full_name,
                usn,
                email,
                phone,
                branch,
                semester,
                section,
                password_hash
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                student.full_name.strip(),
                student.usn.strip().upper(),
                student.email.strip().lower(),
                student.phone.strip(),
                student.branch,
                student.semester,
                student.section.strip(),
                hash_password(student.password)
            )
        )

        connection.commit()

        return {
            "message": "Registration successful",
            "usn": student.usn.strip().upper()
        }

    except sqlite3.IntegrityError:
        raise HTTPException(
            status_code=409,
            detail="USN or email is already registered"
        )

    finally:
        connection.close()


# STUDENT LOGIN
@app.post("/login")
def login_student(credentials: StudentLogin):

    connection = get_connection()

    try:
        student = connection.execute(
            """
            SELECT * FROM students
            WHERE usn = ? COLLATE NOCASE
            """,
            (credentials.usn.strip(),)
        ).fetchone()

    finally:
        connection.close()

    if not student or not verify_password(
        credentials.password,
        student["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid USN or password"
        )

    token = create_access_token(student["usn"])

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "student": {
            "full_name": student["full_name"],
            "usn": student["usn"],
            "email": student["email"],
            "branch": student["branch"],
            "semester": student["semester"],
            "section": student["section"]
        }
    }

# GET LOGGED-IN STUDENT DETAILS
@app.get("/me")
def get_current_student(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    usn = verify_access_token(token)

    if not usn:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    connection = get_connection()

    try:
        student = connection.execute(
            """
            SELECT full_name, usn, email, phone,
                   branch, semester, section
            FROM students
            WHERE usn = ? COLLATE NOCASE
            """,
            (usn,)
        ).fetchone()

    finally:
        connection.close()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return dict(student)