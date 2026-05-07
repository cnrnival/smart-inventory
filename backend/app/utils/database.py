import sqlite3

def init_db():
    conn = sqlite3.connect('inventory.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            sku TEXT UNIQUE NOT NULL,
            validade DATE NOT NULL,
            quantidade INTEGER NOT NULL,
            custo_unitario REAL NOT NULL
        )
    ''')
    try:
        cursor.execute("""
            INSERT INTO produtos (nome, sku, validade, quantidade, custo_unitario) 
            VALUES (?, ?, ?, ?, ?)
        """, ('Produto de Teste', 'SKU-001', '2026-06-15', 10, 25.50))
        print("Produto de teste inserido com sucesso!")
    except sqlite3.IntegrityError:
        print("O produto de teste já existe no banco.")
    conn.commit()
    conn.close()
    print("Banco de dados inicializado!")

if __name__ == "__main__":
    init_db()