# Notes
Theres a bug when launching docker-compose on WSL, do it locally


# TODO
 * django requirements are fucked
 * django dockerfile is on prod more, need to switch to gunicorn or something similar to it
 * react dockerfile for production


### Docker
#### Migrations
```bash
docker-compose exec backend django/manage.py makemigrations
docker-compose exec backend django/manage.py migrate
```

## Django
```python
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000', # react dev
    'http://localhost', # react prod
)
```