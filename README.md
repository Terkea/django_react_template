### Docker
#### Migrations
```bash
docker-compose exec backend django/manage.py makemigrations
docker-compose exec backend django/manage.py migrate
```