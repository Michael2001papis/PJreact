@echo off
cd /d "%~dp0"
echo.
echo ========================================
echo   Starting UserAccessApp
echo ========================================
echo.
echo Killing existing node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Cleaning cache...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist "dist" rmdir /s /q "dist"

echo.
echo Starting dev server...
echo.
echo ========================================
echo   Server will open at: http://localhost:5173
echo ========================================
echo.

npm run dev

