@echo off
title AI Prompt Architect Launcher

:: --- CONFIGURACION PRINCIPAL ---
:: Si la aplicacion se abre en un puerto diferente, cambialo aqui.
SET "URL_A_ABRIR=http://localhost:5173"


echo.
echo =======================================================
echo     Iniciando AI Image Prompt Architect
echo =======================================================
echo.

echo [1/3] Cambiando al directorio del proyecto...
cd /d "%~dp0"

echo.
echo [2/3] Comprobando dependencias (npm install)...
echo      (Esto puede tardar un momento la primera vez)
call npm install

echo.
echo [3/3] Iniciando el servidor de desarrollo...
echo      (Se abrira una nueva ventana para el servidor. NO LA CIERRES.)
echo.
echo      La direccion correcta aparecera en esa nueva ventana.
echo      Normalmente es: %URL_A_ABRIR%
echo.
start "AI Prompt Server" npm run dev

echo      Esperando 8 segundos a que el servidor se inicie...
timeout /t 8 > nul

echo.
echo      Abriendo la aplicacion en tu navegador...

REM --- ELIGE TU NAVEGADOR ---
REM Descomenta (borra 'REM ') la linea del navegador que quieras usar.
REM Asegurate de que solo una de las siguientes lineas 'start' este activa.

REM Opcion A: Abre en tu navegador PREDETERMINADO
start "" "%URL_A_ABRIR%"

REM Opcion B: Forzar apertura en Brave
REM start brave "%URL_A_ABRIR%"

REM Opcion C: Forzar apertura en Google Chrome
REM start chrome "%URL_A_ABRIR%"

REM Opcion D: Forzar apertura en Microsoft Edge
REM start msedge "%URL_A_ABRIR%"


echo.
echo =================================================================
echo   ¡Listo! El servidor esta corriendo en la otra ventana.
echo.
echo   Si el navegador no muestra la pagina, comprueba el puerto
echo   en la ventana del servidor y ajusta la variable
echo   URL_A_ABRIR en este script.
echo =================================================================
echo.

pause