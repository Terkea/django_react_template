## Django user model
Custom fields can be appended to the default `userprofile model` that we provided by editing the model itself and the serializer.
which can be located in `django/api/models/` and `django/api/serializers/

## Configuring the SMTP Server
Update the following constants to get your smtp server up and running
```python
# SMTP SETTINGS
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
PASSWORDLESS_AUTH = {
    'PASSWORDLESS_AUTH_TYPES': ['EMAIL'],
    'PASSWORDLESS_EMAIL_NOREPLY_ADDRESS': "your.email@email.com",
}
```

Then be sure you change from backends `console` to `smtp`
```python
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
```