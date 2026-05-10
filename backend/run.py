from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # Rota de saúde (health check)
    @app.route('/health')
    def health():
        return jsonify({'status': 'ok', 'message': 'Smart Inventory API'})

    # Rota raiz HTML (evita "Cannot GET /")
    @app.route('/')
    def home():
        return '''
        <h1>Smart Inventory API</h1>
        <p>API funcionando. Use os endpoints:</p>
        <ul>
            <li><a href="/health">/health</a></li>
            <li>POST /auth/register</li>
            <li>POST /auth/login</li>
            <li>GET /auth/me (protegido)</li>
        </ul>
        '''

    # Registrar blueprints (vazios por enquanto – Pessoa B e C preencherão)
    from app.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app