# Grype

Revolutionize your habit tracking with growth stimulating byte sized AI suggestions!

<div align="center">
  <img src="./grype.png">
  <h1><b>G R Y P E</b></h1>
  <p><i>Growth, one byte at a time.</i></p>
</div>

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
