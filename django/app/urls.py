from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),

    path('passwordless/', include('drfpasswordless.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('', include('api.urls')),
]
