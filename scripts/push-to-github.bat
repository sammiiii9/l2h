@echo off
title Push L2H Solution to GitHub
echo =====================================================
echo  Pushing L2H Solution to https://github.com/sammiiii9/l2h
echo =====================================================
cd /d "%~dp0\.."

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/download/win or use GitHub Desktop.
    pause
    exit /b 1
)

if not exist ".git" (
    git init
)

git remote remove origin 2>nul
git remote add origin https://github.com/sammiiii9/l2h.git

git add .
git commit -m "Production release: L2H Solution Real Estate Advisory Platform"
git branch -M main
git push -u origin main

echo.
echo =====================================================
echo Done! Check your repo: https://github.com/sammiiii9/l2h
echo =====================================================
pause
