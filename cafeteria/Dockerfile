FROM python:3.10

RUN mkdir -p /home/cofeetime

WORKDIR /home/cofeetime

ENV PYTHONUNBUFFERED=1

EXPOSE 8000

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .


