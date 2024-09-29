from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from transformers import pipeline
import os
import torch
import whisper

app = Flask(__name__)
CORS(app)
model = whisper.load_model("tiny")

goal_status_pipe = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")

@app.route("/analyze", methods=["POST"])
def analyze():
    input_text = request.json.get("text")    
    goal_status = classify_goal_status(input_text)
    return jsonify({"goal_status": goal_status})

def classify_goal_status(sentence):
    result = goal_status_pipe(sentence)
    if result[0]['label'] == 'POSITIVE':
        return 1
    return 0

@app.route("/transcribe", methods=["POST"])
def transcribe():
    file = request.files.get('file')

    if not file:
        return "Missing file"

    filePath = os.path.join("/tmp/", file.filename or "file.webm")
    file.save(filePath)
    result = model.transcribe(filePath)

    os.remove(filePath)

    return jsonify({"goal_status": classify_goal_status(result["text"])})


if __name__ == "__main__":
    app.run(debug=True)
