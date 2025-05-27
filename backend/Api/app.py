from flask import Flask, request, jsonify
from summarizer import summarize_text
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allow requests from your React frontend

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

    api_key = "AIzaSyBfgXYhiPrv_aolSwtKNTjBf2p0LfvHroQ"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

    headers = {
        "Content-Type": "application/json"
    }

    json_data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": question
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=json_data)
        if response.status_code != 200:
            error_details = response.text
            print(f"Gemini API error: Status {response.status_code}, Response: {error_details}")
            return jsonify({"error": "Failed to get response from Gemini API", "details": error_details}), 500

        response_json = response.json()
        answer = response_json.get('candidates', [{}])[0].get('output', 'No answer returned')
        return jsonify({"answer": answer})
    except Exception as e:
        print(f"Exception during Gemini API call: {str(e)}")
        return jsonify({"error": "Exception during Gemini API call", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)
