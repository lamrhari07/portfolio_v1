#!/bin/bash

echo "PostgreSQL started"

python manage.py makemigration
python manage.py migrate

exec "$@"