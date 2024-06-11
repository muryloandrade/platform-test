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
            cursor.execute('SELECT * FROM markers;')
            result = cursor.fetchall()
            markers = []
            for row in result:
                markers.append({
                    'id': row[0],
                    'timestamp': row[1].isoformat(),
                    'latitude': row[2],
                    'longitude': row[3]
                })
            return jsonify({'markers': markers}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500