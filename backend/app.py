# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import get_response

app = Flask(__name__)
CORS(app)  # To allow requests from React frontend

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get("message", "")
    reply = get_response(message)
    return jsonify({"response": reply})

if __name__ == '__main__':
    app.run(debug=True)
