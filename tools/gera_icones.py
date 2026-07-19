# -*- coding: utf-8 -*-
# Gera icones quadrados 16/48/128 a partir do selo (300x222), centralizado em fundo branco.
from PIL import Image
import os

base = os.path.join(os.path.dirname(__file__), "..", "extension", "icons")
src = Image.open(os.path.join(base, "selo.png")).convert("RGBA")

for size in (16, 48, 128):
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
    w, h = src.size
    scale = min(size / w, size / h) * 0.92  # pequena margem
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    resized = src.resize((nw, nh), Image.LANCZOS)
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
    canvas.save(os.path.join(base, f"icon{size}.png"))
    print(f"icon{size}.png ok")
