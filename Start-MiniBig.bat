@echo off
title MiniBig Launcher

set "PROJECT_DIR=%~dp0"

echo Starting MiniBig Backend...
start "MiniBig Backend" cmd /k "cd /d ""%PROJECT_DIR%backend"" && call .venv\Scripts\activate.bat && uvicorn main:app --reload"

echo Starting MiniBig Frontend...
start "MiniBig Frontend" cmd /k "cd /d ""%PROJECT_DIR%"" && npm run dev"

echo Waiting for servers...
timeout /t 6 /nobreak >nul

start "" http://localhost:5173

echo MiniBig launched!