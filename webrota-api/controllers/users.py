import psycopg2
from flask import jsonify

def validate_user(user, password):
    try:
        con = psycopg2.connect(
            host='localhost',
            user='root',
            password='root',
            dbname='root',
            port=5432,
        )

        with con.cursor() as cursor:
            cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s;', (user, password))
            result = cursor.fetchone()
            if result:
                return True
            else:
                return False

    except Exception as e:
        return jsonify({'error': str(e)}), 500