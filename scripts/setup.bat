@echo off
chcp 65001 > nul
title Content Studio - Setup do Cliente
color 0A

echo.
echo ═══════════════════════════════════════════════════════════════
echo             CONTENT STUDIO - SETUP DE NOVO CLIENTE
echo                     Kendy Producoes - 2026
echo ═══════════════════════════════════════════════════════════════
echo.

:: Verificar se config.json existe
if not exist "config.json" (
    echo [ERRO] config.json nao encontrado!
    echo Execute este script na pasta raiz do projeto.
    pause
    exit /b 1
)

:: Verificar se data.json existe
if not exist "data.json" (
    echo [ERRO] data.json nao encontrado!
    pause
    exit /b 1
)

echo [OK] Arquivos encontrados
echo.

:: Verificar Python
python --version > nul 2>&1
if errorlevel 1 (
    echo [AVISO] Python nao encontrado. Validacao automatica desabilitada.
    set PYTHON_OK=0
) else (
    echo [OK] Python encontrado
    set PYTHON_OK=1
)
echo.

echo ═══════════════════════════════════════════════════════════════
echo                    CHECKLIST DE SETUP
echo ═══════════════════════════════════════════════════════════════
echo.
echo Verifique se voce completou as etapas:
echo.
echo [ ] 1. Editou config.json com dados do cliente?
echo [ ] 2. Substituiu assets/logo.png pela logo do cliente?
echo [ ] 3. Preencheu data.json com o calendario?
echo [ ] 4. Configurou webhook (se necessario)?
echo.

set /p CONFIRM="Todas as etapas estao completas? (S/N): "
if /i not "%CONFIRM%"=="S" (
    echo.
    echo Complete as etapas antes de continuar.
    echo Consulte docs/CHECKLIST.md para detalhes.
    pause
    exit /b 0
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo                    VALIDANDO ARQUIVOS
echo ═══════════════════════════════════════════════════════════════
echo.

:: Validar JSON se Python disponivel
if "%PYTHON_OK%"=="1" (
    echo Validando data.json...
    python scripts/validate.py
    if errorlevel 1 (
        echo.
        echo [ERRO] data.json invalido! Corrija os erros acima.
        pause
        exit /b 1
    )
    echo.
)

:: Verificar se logo existe
if exist "assets\logo.png" (
    echo [OK] Logo encontrada: assets/logo.png
) else (
    echo [AVISO] Logo nao encontrada em assets/logo.png
)
echo.

echo ═══════════════════════════════════════════════════════════════
echo                    SETUP CONCLUIDO!
echo ═══════════════════════════════════════════════════════════════
echo.
echo Proximos passos:
echo.
echo 1. Faca commit das alteracoes:
echo    git add .
echo    git commit -m "Setup inicial do cliente"
echo    git push origin main
echo.
echo 2. Configure GitHub Pages:
echo    Settings -^> Pages -^> Branch: main -^> Save
echo.
echo 3. Acesse o dashboard em 2-3 minutos:
echo    https://SEU_USUARIO.github.io/NOME_DO_REPO/
echo.

pause
