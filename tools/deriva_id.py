# -*- coding: utf-8 -*-
# Deriva o ID da extensao (32 letras a-p) a partir da chave privada.
import hashlib, os
from cryptography.hazmat.primitives import serialization

pem = os.path.join(os.path.dirname(__file__), "..", "chave.pem")
key = serialization.load_pem_private_key(open(pem, "rb").read(), password=None)
spki = key.public_key().public_bytes(
    serialization.Encoding.DER, serialization.PublicFormat.SubjectPublicKeyInfo)
h = hashlib.sha256(spki).digest()[:16]
print("".join(chr(ord('a') + (b >> 4)) + chr(ord('a') + (b & 15)) for b in h))
