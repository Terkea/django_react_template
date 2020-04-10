from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework import viewsets, status

from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

from .permissions import IsOwner


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
