# Grype

Revolutionize your habit tracking with growth stimulating byte sized AI suggestions!

<div align="center">
  <img src="./grype.png">
  <h1><b>G R Y P E</b></h1>
  <p><i>Growth, one byte at a time.</i></p>
</div>

Imagine having a personal assistant that helps you set and achieve your goals, using the power of AI to provide personalized suggestions and motivation. Welcome to Grype, a cutting-edge web application that combines speech recognition, natural language processing, and machine learning to help you reach your full potential.

With Grype, you'll enjoy a unique and interactive experience that helps you:
1. Set and track your goals with ease
2. Receive personalized suggestions and recommendations based on your input
3. Stay Gryped with inspiring quotes and messages
4. Celebrate your successes and learn from your setbacks

Whether you're looking to improve your productivity, achieve a specific goal, or simply need a boost of motivation, Grype is here to help. Try it out today and discover a more focused, driven, and successful you!

# Prerequisites
- Python 3
- NodeJS 22

# Setup

Clone the repo  

```bash
git clone https://github.com/jwt2706/Grype
cd Grype
```

Starting the backend:  

```bash
cd Server
python -m venv venv

# Linux
source ./venv/bin/activate
# Windows
.\venv\Scripts\activate.bat

pip install -r ./requirements.txt
python ./main.py
```

Serving the frontend:  

```bash
cd App
npm i
npm run dev -- --host
```

Note, for proper communications, they should both run on the same machine.  
You can access the application at `http://hostname:5173`
