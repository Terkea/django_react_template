#!/bin/bash

python manage.py migrate --run-syncdb

# Make database migrations
echo "Apply database migrations"
python manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000