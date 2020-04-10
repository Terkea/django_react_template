from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_auth.serializers import UserDetailsSerializer


class UserSerializer(UserDetailsSerializer):
    # not required field
    company_name = serializers.CharField(source="userprofile.company_name", allow_null=True, allow_blank=True, default=None)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('company_name',)

    def update(self, instance, validated_data):
        # disable update username when updating the user
        username = validated_data.pop('username', None)

        profile_data = validated_data.pop('userprofile', {})
        company_name = profile_data.get('company_name')
        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and company_name:
            profile.company_name = company_name
            profile.save()
        return instance
