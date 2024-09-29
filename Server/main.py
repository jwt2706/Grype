from flask import Flask, Response, request, jsonify
from flask_cors import CORS, cross_origin
from transformers import pipeline
import os
import torch
import whisper
import random

app = Flask(__name__)
CORS(app)
model = whisper.load_model("tiny")

goal_categories = ['exercise', 'food', 'water', 'social']
sentence_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
goal_status_pipe = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")

suggestions = {
    "exercise": [
        "Go for a run",
        "Do 10 minutes of yoga",
        "Go to the gym for 30 minutes",
        "Take a brisk walk",
        "Try a dance workout",
        "Go for a bike ride",
        "Do a HIIT workout",
        "Swim laps at a pool",
        "Join a group fitness class",
        "Watch a home workout video",
        "Practice Pilates",
        "Climb stairs for 15 minutes",
        "Play a sport (e.g., basketball, soccer)",
        "Go hiking in nature",
        "Try a martial arts class"
    ],
    "social": [
        "Call a friend",
        "Join a club",
        "Attend a meetup",
        "Organize a game night",
        "Go out for coffee with someone",
        "Volunteer for a local charity",
        "Attend a workshop or class",
        "Join a book club",
        "Invite neighbors for a BBQ",
        "Attend a concert or live event",
        "Go to a farmers' market",
        "Plan a day trip with friends",
        "Visit a museum or gallery",
        "Take a group class (cooking, art, etc.)",
        "Participate in a community sports league"
    ],
    "food": [
        "Eat a salad",
        "Try a new recipe",
        "Have a smoothie",
        "Cook a healthy stir-fry",
        "Make a veggie omelette",
        "Prepare a grain bowl",
        "Bake some healthy snacks",
        "Try a new fruit or vegetable",
        "Experiment with a new cuisine",
        "Meal prep for the week",
        "Make a homemade soup",
        "Try a plant-based dish",
        "Create a healthy dessert",
        "Pack a nutritious lunch",
        "Explore a local farmers' market for fresh ingredients"
    ],
    "water": [
        "Drink a glass of water",
        "Have some herbal tea",
        "Stay hydrated",
        "Infuse water with fruits (e.g., lemon, cucumber)",
        "Drink coconut water",
        "Set reminders to drink water throughout the day",
        "Carry a reusable water bottle all day",
        "Drink a glass of water before each meal",
        "Enjoy iced herbal teas",
        "Try homemade flavored water",
        "Start your day with a glass of water in the morning"
    ]
}

@app.route("/suggest", methods=["POST"])
def suggest():
    topics = list(request.get_json()["topics"])

    if not topics:
        return Response("Invalid argument", status=400)

    topics = list(filter(lambda x: x in goal_categories, topics))

    if len(topics) == 0:
        return Response("Invalid argument", status=400)
    
    output = []

    for topic in topics:
        output.append({
            "topic": topic,
            "suggestion": random.choice(suggestions[topic])
        })

    return jsonify(output)


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
