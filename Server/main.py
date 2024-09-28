from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

goal_status_pipe = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")

@app.route("/analyze", methods=["POST"])
def analyze():
    input_text = request.json.get("text")    
    goal_status = classify_goal_status(sentence)
    return jsonify({"goal_status": goal_status})

def classify_goal_status(sentence):
    result = goal_status_pipe(sentence)
    if result[0]['label'] == 'POSITIVE':
        return 1
    return 0

if __name__ == "__main__":
    app.run(debug=True)