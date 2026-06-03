FROM python:3.11-slim-bullseye

ENV DUMMY=2

RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# ./venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
#to run backend locally, go to the backend folder and run this