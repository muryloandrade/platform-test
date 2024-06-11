from flask import Flask, jsonify,request
from controllers.users import validate_user
from controllers.markers import getMarkers

app = Flask(__name__)

@app.route('/authenticate', methods=['GET'])
def authenticate():
    try:
        user = request.args.get('user')
        password = request.args.get('password')

        if not user or not password:
            return jsonify({'error': 'Parâmetros faltando.'}), 400

        authenticated = validate_user(user, password)

        if authenticated:
            return jsonify({'authenticated': True}), 200
        else:
            return jsonify({'authenticated': False}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/getMarkers', methods=['GET'])
def getMark():
    return getMarkers()

        
if __name__ == '__main__':
    app.run(port=5000)
