# A Django & React Template
A Django and React Template that will help you skip a lot of boilerplate and initial project setup, which features:
- [Passwordless](https://auth0.com/docs/connections/passwordless) user authentification/registration, which is a more modern and secure way of logging in
- Functionality to update the user profile.

This template is based on the [Ant Design](https://ant.design) ui kit powered by [Django REST](https://www.django-rest-framework.org/).

![login](/img/login_error.gif)
![login](/img/login_success.gif)
![login](/img/update_profile.gif)

# Motivation
When starting a new project it can be incredibly time consuming to reach the milestone that finally will let you start implementing your ideas, and doing actual work.

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

# Customization
## React
###  Antd Theming
![antd theming](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)
ANTD is using Less as the development language for styling. A set of less variables are defined for each design aspect that can be customized to your needs.
There are some major variables below, all less variables could be found in [Default Variables.](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less). 

Your custom changes should go on `react/config-overrides.js`.

For more details about all the potential customizations don't hesitate and check on [their page](https://ant.design/docs/react/customize-theme) which covers them all.

### Django user model
Custom fields can be appended to the default `userprofile model` that we provided by editing the model itself and the serializer.



# Documentation
The documentation is currently under construction and it is yet to be decided what it is going to cover and how detailed it will be.
- [React](./docs/react/README.md)
- [Django](./docs/django/README.md)
