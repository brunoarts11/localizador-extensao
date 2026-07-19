@echo off
:: Remove o Localizador de Documentos do Google Chrome (politica de registro)
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Execute como ADMINISTRADOR.
  pause
  exit /b 1
)
set "ALVO=ffecknbekidaohnbhceoninhegcidnbg"
set KEY=HKLM\Software\Policies\Google\Chrome\ExtensionInstallForcelist
for /L %%i in (1,1,9) do (
  for /f "tokens=3*" %%a in ('reg query "%KEY%" /v %%i 2^>nul ^| findstr REG_SZ') do (
    echo %%a %%b | findstr /i "%ALVO%" >nul && (
      reg delete "%KEY%" /v %%i /f >nul
      echo Removido. Reinicie o Chrome.
      pause
      exit /b 0
    )
  )
)
echo Entrada nao encontrada.
pause
