from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # custom fields for user
    address = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=20, null=True)
    postcode = models.CharField(max_length=10, null=True)
    mobile_phone = models.CharField(max_length=20, null=True)
    avatar = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.user.username

