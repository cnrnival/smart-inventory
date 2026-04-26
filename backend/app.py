from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('inventory.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/dashboard/summary', methods=['GET'])
def get_summary():
    try:
        conn = get_db_connection()
        row = conn.execute('SELECT COUNT(*) as total FROM produtos').fetchone()
        total_produtos = row['total']
        conn.close()
        return jsonify({
            "financialRisk": 255.00,   # mock, será substituído na Sprint 2
            "totalProducts": total_produtos,
            "status": "online",
            "message": "API Smart Inventory ativa."
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)