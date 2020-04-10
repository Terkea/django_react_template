from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # custom fields for user
    address = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=20, null=True)
    postcode = models.CharField(max_length=10, null=True)
    mobile_phone = models.CharField(max_length=20, null=True)
    avatar = models.CharField(max_length=100, null=True)

@receiver(post_save, sender=User)
def create_profile_for_user(sender, instance=None, created=False, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)