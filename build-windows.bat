@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Сборка: Басовое космическое сыроварение

where node >nul 2>nul
if errorlevel 1 (
  echo Для сборки нужен Node.js. Сейчас откроется сайт nodejs.org:
  echo скачай версию LTS, установи её и запусти этот файл ещё раз.
  start https://nodejs.org/
  pause
  exit /b 1
)

echo [1/2] Скачиваю Electron и сборщик. В первый раз это занимает несколько минут...
call npm ci
if errorlevel 1 call npm install
if errorlevel 1 goto fail

echo [2/2] Собираю программу...
call npm run dist
if errorlevel 1 goto fail

echo.
echo Готово. Файл Basovoe-syrovarenie.exe лежит в папке dist, она сейчас откроется.
start "" "%~dp0dist"
pause
exit /b 0

:fail
echo.
echo Сборка не удалась, текст ошибки выше.
pause
exit /b 1
