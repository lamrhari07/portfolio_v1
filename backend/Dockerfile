FROM python:3.8

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# create root directory for our project in the container
RUN mkdir /app

# Set the working directory.
WORKDIR /app

ADD . /app/

COPY requirements.txt /app
COPY docker-entrypoint.sh /app
RUN pip install -r requirements.txt

EXPOSE 8000
# ENTRYPOINT [ "docker-entrypoint.sh" ]
# # copy docker-entrypoint.sh
# RUN python manage.py makemigrations
# RUN python manage.py migrate