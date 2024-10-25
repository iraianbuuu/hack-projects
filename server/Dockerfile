FROM python:3.11

WORKDIR /code

USER root

COPY ./requirements.txt /code/requirements.txt

ADD --chmod=755 https://astral.sh/uv/install.sh /install.sh

RUN /install.sh && rm /install.sh

RUN /root/.cargo/bin/uv pip install --system --no-cache -r requirements.txt

COPY . /code

USER user

# CMD ["python", "main.py"]
# CMD ["gunicorn", "--bind", "0.0.0.0:7860", "app:get_repos()"]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "7860"]
