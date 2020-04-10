# Description
This is a Django rest-framework api template wrapped into a `docker container` along with `postgres` and `pgAdmin4`

- [django-rest-auth](https://django-rest-auth.readthedocs.io/en/latest/introduction.html) preinstalled + `facebook social auth`

- [endpoints](https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html) provided by rest_auth

- The user model has been extended using a one to one relationship, to create custom fields edit `UserProfile` and `UserSerializer`

- By default username's can't be updated, to change that remove the following from `UserSerializer`
```python
username = validated_data.pop('username', None)
```

### Warning!

When switching to a `production environment`:
 1. Change the default admin url
 2. Set up a database password
 3. Turn the email notifications on
 
`settings.py`
```python
ACCOUNT_EMAIL_VERIFICATION = 'none'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': '5432',
    }
}
```
## Tokens 

Type: `Barer token`

#### Request structure

Header name: `Authorization`

Value: `Token 4a293b090ecf7b0274dfd12765a9ad66f6bc36dd`


## Docker
Default ports:
- server `80`
- postgres `5432`
- pgAdmin4 `5555` 

#### pgAdmin login default credentials:
```dockerfile
      PGADMIN_DEFAULT_EMAIL: pgadmin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
```


- makemigrations
`docker-compose run web python src/manage.py makemigrations`

- migrate
`docker-compose run web python src/manage.py migrate`

#### react.js starting template
working on
