# Installation
## React
```bash
cd react
npm i
npm start
```

## Django
```bash
cd django
# create the virtual environment
python3 -m venv venv 
# depending on your os this might vary but activate the newly created env
source venv/bin/activate 
# install the requirements
pip install -r requirements.txt 
python3 manage.py makemigrations
python3 manage.py migrate
# In case django complains about migrations at any point go with
python3 manage.py migrate --run-syncdb
# run the server
python3 manage.py runserver
```

