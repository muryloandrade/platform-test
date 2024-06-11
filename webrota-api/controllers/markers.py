import psycopg2
from flask import jsonify

def getMarkers():
    try:
        con = psycopg2.connect(
            host='localhost',
            user='root',
            password='root',
            dbname='root',
            port=5432,
        )

        with con.cursor() as cursor:
            cursor.execute('SELECT latitude, longitude FROM markers;')
            result = cursor.fetchall()
            markers = [{'latitude': row[0], 'longitude': row[1]} for row in result]

            return markers, 200  # Retornando apenas o array de marcadores

    except Exception as e:
        return jsonify({'error': str(e)}), 500
