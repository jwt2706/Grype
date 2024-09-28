from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

@app.route("/sentiment", methods=["POST"])
def sentiment():
    input_text = request.json.get("text")
    pipe = pipeline("text-classification")
    result = pipe(input_text)
    return result['score']

@app.route("/summarize", methods=["POST"])
def summarize():
    input_text = request.json.get("text")

    model = BertSummarizer.from_pretrained('bert-base-uncased')
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    inputs = tokenizer.encode_plus(input_text, return_tensors='pt', max_length=512, truncation=True)
    summary_ids = model.generate(inputs['input_ids'], num_beams=4, max_length=200)
    summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary_text


# if this works. have a way to make python script to download all the models we need
# then make this just load the right model from the local



if __name__ == "__main__":
    app.run(debug=True)