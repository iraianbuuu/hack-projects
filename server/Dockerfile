FROM python:3.11

WORKDIR /code

USER root

COPY ./requirements.txt /code/requirements.txt

RUN pip install -r requirements.txt

COPY . /code

USER user

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]