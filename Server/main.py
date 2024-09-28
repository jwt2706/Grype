from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

goal_categories = ['exercise', 'diet', 'hydration', 'hygiene', 'social', 'sleep', 'production', 'misc']
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.route("/analyze", methods=["POST"])
def analyze():
    input_text = request.json.get("text")
    sentences = split_sentences(input_text)
    classified_sentences = []
    for sentence in sentences:
        goal_type = classify_sentence(sentence)
        goal_status = classify_goal_status(sentence)
        classified_sentences.append({"goal_type": goal_type, "goal_status": goal_status})
    return classified_sentences

def split_sentences(text):
    return text.split(".")

def classify_sentence(sentence):
    result = classifier(sentence, goal_categories)
    print("---------- SENTENCE CLASSIFICTATION START -------------")
    print(result)
    print(result['labels'][0])
    print("---------- SENTENCE CLASSIFICTATION END -------------")
    return result['labels'][0]

def classify_goal_status(sentence):
    pipe = pipeline("sentiment-analysis")
    result = pipe(sentence)
    return result[0]['label']

if __name__ == "__main__":
    app.run(debug=True)