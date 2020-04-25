# A Django & React Template
A Django and React Template that will help you skip a lot of boilerplate and initial project setup. 

This template is based on the [Ant Design](https://ant.design) webkit.

![login](/img/login_error.gif)
![login](/img/login_success.gif)
![login](/img/update_profile.gif)

# Motivation
When starting a new project it can be incredibly time consuming to reach the milestone that will let you finally start implementing your ideas, and doing actual work.

The goal of this project is to be just that, a solid modern project template that you can easily pick up on and not worry too much about the boilerplate.

# Installation
## Docker
To install it with docker, you only need to run the following command:
```bash
# Make sure that you have Docker installed, use -d to hide logs
docker-compose up --build
```
Otherwise you may install it the regular separate way:
## React
```bash
cd react
# Install the node packages
npm install
# Start the App in Development Mode
npm start
```

## Django
```bash
cd django
# Create the virtual environment
python3 -m venv env 
# You need to activate everytime you open a new terminal
./env/Scripts/activate
# Install the requirements
pip install -r requirements.txt 
python manage.py makemigrations
python manage.py migrate
# In case django complains about migrations at any point go with
python manage.py migrate --run-syncdb
# Run the server
python manage.py runserver
```