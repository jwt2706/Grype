from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

app = Flask(__name__)

@app.route("/sentiment", methods=["POST"])
def sentiment():
    input_text = request.json.get("text")

    # load the mode
    model_name = "distilbert-base-uncased-finetuned-sst-2-english"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)

    # tokenize the input text
    inputs = tokenizer(input_text, return_tensors="pt")

    # analysis
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_label = torch.argmax(logits)

    return {"sentiment": predicted_label.item()}

@app.route("/summurize", methods=["POST"])
def summurize():
    input_text = request.json.get("text")

    # load the mode
    model_name = "sshleifer/distilbart-xsum-12-3"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(model_name)

    # tokenize the input text
    inputs = tokenizer(input_text, return_tensors="pt")

    # analysis
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_label = torch.argmax(logits)

    return {"summurize": predicted_label.item()}


# if this works. have a way to make python script to download all the models we need
# then make this just load the right model from the local



if __name__ == "__main__":
    app.run(debug=True)