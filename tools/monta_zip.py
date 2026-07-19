# -*- coding: utf-8 -*-
# Monta o zip de submissao do Firefox com separadores '/' (exigencia do AMO).
# O Compress-Archive do PowerShell usa '\', que o AMO rejeita.
import os, zipfile

raiz = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
src = os.path.join(raiz, "extension-firefox")
dst = os.path.join(raiz, "dist", "localizador-firefox-fonte.zip")

with zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as z:
    for pasta, _, arquivos in os.walk(src):
        for nome in arquivos:
            caminho = os.path.join(pasta, nome)
            rel = os.path.relpath(caminho, src).replace(os.sep, "/")
            z.write(caminho, rel)
            print("+", rel)
print("ok:", dst)
