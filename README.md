# Localizador de Documentos — Extensão de Navegador (11ª CIPM/PMPE)

Extensão que abre o assistente de localização de documentos da 11ª CIPM/PMPE num **painel lateral do Firefox**. Espelha a interface web oficial e conversa com o mesmo backend (n8n). Uso restrito ao efetivo da Unidade — código de acesso exigido no primeiro uso.

**Canal oficial: Firefox.** Assinada pela Mozilla, distribuição própria (não listada), com **atualização automática** — publicar uma nova versão aqui atualiza o navegador de todo o efetivo sem nenhuma ação do usuário.

## Instalação (efetivo)

1. No **Firefox**, abra o link:

   **https://brunoarts11.github.io/localizador-extensao/dist/localizador-1.0.2.xpi**

2. O Firefox pergunta se permite a instalação → **Continuar** → **Adicionar**.
3. Confirme o aviso de privacidade (a extensão **não coleta nenhum dado**).
4. Clique no ícone do selo da PMPE na barra de ferramentas — o painel lateral abre.
5. Na primeira mensagem, envie o **código de acesso** fornecido pela Unidade (uma única vez por instalação).

Requisito: Firefox 140 ou superior (o Firefox se atualiza sozinho; qualquer instalação recente atende).

Para remover: `about:addons` → Localizador de Documentos → Remover.

## Estrutura do repositório

```
extension-firefox/   Código-fonte do canal oficial (Firefox, sidebar_action)
extension-chrome/    LEGADO — porte Chrome funcional, não distribuído (ver abaixo)
dist/                Artefatos publicados pelo GitHub Pages (.xpi assinado, zip de submissão)
tools/               Scripts de build (ícones, zip de submissão AMO, derivação de ID)
updates.json         Manifesto de atualização automática do Firefox (servido pelo Pages)
```

## Publicar uma nova versão (mantenedor)

1. Edite os arquivos em `extension-firefox/`.
2. Suba a `version` em `extension-firefox/manifest.json` (ex.: `1.0.1`).
3. Gere o zip de submissão (usa separadores `/`, exigência do AMO):
   ```powershell
   python tools\monta_zip.py
   ```
4. Envie `dist\localizador-firefox-fonte.zip` para assinatura em
   [addons.mozilla.org/developers](https://addons.mozilla.org/developers/) → extensão *Localizador de Documentos* → **Enviar uma nova versão** → canal "Faça você mesmo" (a assinatura automática leva minutos; chega aviso por e-mail).
5. Baixe o `.xpi` assinado e salve como `dist/localizador-1.0.1.xpi` (mantenha o número da versão no nome).
6. Atualize `updates.json`: acrescente a nova versão com o `update_link` apontando para o novo arquivo.
7. Commit + push. O GitHub Pages publica e os Firefox do efetivo atualizam sozinhos nas horas seguintes.

> A conta Mozilla (com 2FA) é o ativo crítico de release — sem ela não há assinatura de novas versões.

## Identificadores

| Item | Valor |
|---|---|
| ID da extensão (gecko) | `localizador@11cipm.pmpe.br` |
| Ficha no AMO (Developer Hub) | Addon #3041068 |
| URL de atualização | `https://brunoarts11.github.io/localizador-extensao/updates.json` |
| Backend | `https://n8n.ebruno.com.br/webhook/localizador-chat` |

## Sobre o legado Chrome (`extension-chrome/`)

A extensão foi primeiro construída para Chrome (side panel + auto-update via política `ExtensionInstallForcelist`). Descobriu-se que o Chrome **só honra essa política em máquinas gerenciadas** por domínio corporativo ou Chrome Browser Cloud Management — as máquinas do efetivo não são. O código permanece aqui como referência, junto com os instaladores de registro (`instalar.bat`/`desinstalar.bat`), o `updates.xml` e o `.crx` assinado (ID `ffecknbekidaohnbhceoninhegcidnbg`, chave `.pem` guardada fora do repositório).

Caminhos para reativar esse canal no futuro: publicação na Chrome Web Store (taxa única de US$ 5 + revisão) ou gerenciamento das máquinas via Google Admin.
