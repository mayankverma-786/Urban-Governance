from flask import Flask, request, jsonify
from summarizer import summarize_text
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Make sure to set this environment variable

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    complaint = data.get('complaint')

    if not complaint:
        return jsonify({"error": "No complaint text provided"}), 400

    summary = summarize_text(complaint)
    return jsonify({"summary": summary})

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({"error": "No question provided"}), 400

    # Call OpenAI API (GPT-3.5 Turbo) for free-tier usage
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    json_data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant for the Urban Governance project."},
            {"role": "user", "content": question}
        ],
        "max_tokens": 150,
        "temperature": 0.7
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=json_data)

    if response.status_code != 200:
        return jsonify({"error": "Failed to get response from chatbot API"}), 500

    answer = response.json()['choices'][0]['message']['content']
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(port=5001)  # You can choose a port other than your Node.js server
