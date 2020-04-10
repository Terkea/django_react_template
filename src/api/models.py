from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # custom fields for user
    company_name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.user.username

