from .auth import auth_bp

#Isso permite que o blueprint seja importado mesmo antes da Pessoa B escrever auth.py – evita erro no __init__.py principal.