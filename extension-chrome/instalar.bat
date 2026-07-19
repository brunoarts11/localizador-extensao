@echo off
:: Instala o Localizador de Documentos - 11a CIPM/PMPE no Google Chrome
:: Requer executar como Administrador (botao direito > Executar como administrador)
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Execute este arquivo como ADMINISTRADOR: botao direito ^> "Executar como administrador".
  pause
  exit /b 1
)
set "VALOR=ffecknbekidaohnbhceoninhegcidnbg;https://brunoarts11.github.io/localizador-extensao/updates.xml"
set KEY=HKLM\Software\Policies\Google\Chrome\ExtensionInstallForcelist
for /L %%i in (1,1,9) do (
  reg query "%KEY%" /v %%i >nul 2>&1 || (
    reg add "%KEY%" /v %%i /t REG_SZ /d "%VALOR%" /f >nul
    echo Instalado com sucesso ^(entrada %%i^). Feche TODAS as janelas do Chrome e abra novamente.
    pause
    exit /b 0
  )
)
echo Nao havia indice livre na politica. Contate o suporte.
pause
exit /b 1
