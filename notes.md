# Notes
Theres a bug when launching docker-compose on WSL, do it locally


# TODO
 * django requirements are not working
 * django dockerfile is on prod more, need to switch to gunicorn or something similar to it
 * react dockerfile for production
 * http://localhost:3001/my_profile/basic/ works when logged out
 * docker-compose dev volumes on react dont work
 * examine the docker-containers volumes. i might had been sloppy when writing them
### Docker

#### ENVS
##### RUN PROD

*In case django complains about migrations at any point go with*
```bash
docker-compose.exe exec backend django/manage.py migrate --run-syncdb
```

```bash
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose.exe -f docker-compose.prod.yml exec backend django/manage.py makemigrations
docker-compose.exe -f docker-compose.prod.yml exec backend django/manage.py migrate
```

##### RUN DEV
```bash
docker-compose up -d --build
docker-compose exec backend django/manage.py makemigrations
docker-compose exec backend django/manage.py migrate
```

## Django
### CROS ORIGIN
```python
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000', # react dev
    'http://localhost', # react prod
)
```

### SMTP SETTINGS
```python
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''

PASSWORDLESS_AUTH = {
# Allowed auth types, can be EMAIL, MOBILE, or both.
    'PASSWORDLESS_AUTH_TYPES': ['EMAIL'],

    # The email the callback token is sent from
    'PASSWORDLESS_EMAIL_NOREPLY_ADDRESS': "dev.terkea@gmail.com",
}
```

