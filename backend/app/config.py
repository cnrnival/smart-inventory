import os
from dotenv import load_dotenv

load_dotenv() #carrega as variáveis do .env

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False #Configuração para evitar pool de conexões(evita queda do neon)
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 10, #Número máximo de conexões no pool
        'max_overflow': 20, #Número máximo de conexões extras além do pool_size
        'pool_pre_ping': True, #Verifica se a conexão está ativa antes de usá-la
    }
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'fallback-dev-key')