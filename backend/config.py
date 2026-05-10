import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = (
        'pool_size': 10,
        'max_overflow': 20,
        'pool_pre_ping': True,
    )
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'fallback_secret_key')    