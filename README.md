# Localizador de Documentos — Extensão Chrome (11ª CIPM/PMPE)

Extensão do Google Chrome que abre o assistente de localização de documentos da 11ª CIPM/PMPE num painel lateral. Espelha a interface web oficial e conversa com o mesmo backend (n8n). Uso restrito ao efetivo da Unidade (código de acesso exigido no primeiro uso).

## Instalação (efetivo)

1. Baixe `instalar.bat` deste repositório.
2. Clique com o botão direito → **"Executar como administrador"**.
3. Feche TODAS as janelas do Chrome e abra novamente.
4. O ícone do selo da PMPE aparece na barra de extensões — clique para abrir o painel.
5. No primeiro uso, envie o código de acesso fornecido pela Unidade.

Para remover: execute `desinstalar.bat` como administrador.

## Publicar uma nova versão (mantenedor)

1. Edite os arquivos em `extension/`.
2. Suba a versão em **dois** lugares: `extension/manifest.json` e `updates.xml` (devem ser idênticas).
3. Reempacote com a chave original (`chave.pem` — NUNCA commitá-la):
   ```powershell
   & "C:\Program Files\Google\Chrome\Application\chrome.exe" --pack-extension="<repo>\extension" --pack-extension-key="<repo>\chave.pem"
   Move-Item extension.crx dist\localizador.crx -Force
   ```
4. `git add -A && git commit && git push` — o GitHub Pages publica e todos os Chromes atualizam sozinhos em algumas horas.

## Identificadores

- Extension ID: `ffecknbekidaohnbhceoninhegcidnbg`
- Update URL: `https://brunoarts11.github.io/localizador-extensao/updates.xml`
