from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_auth.serializers import UserDetailsSerializer


class UserSerializer(UserDetailsSerializer):
    # not required field
    address = serializers.CharField(source="userprofile.address", allow_null=True, allow_blank=True, default=None)
    city = serializers.CharField(source="userprofile.city", allow_null=True, allow_blank=True, default=None)
    postcode = serializers.CharField(source="userprofile.postcode", allow_null=True, allow_blank=True, default=None)
    mobile_phone = serializers.CharField(source="userprofile.mobile_phone", allow_null=True, allow_blank=True, default=None)
    avatar = serializers.CharField(source="userprofile.avatar", allow_null=True, allow_blank=True, default=None)

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('address',)
        fields = UserDetailsSerializer.Meta.fields + ('city',)
        fields = UserDetailsSerializer.Meta.fields + ('postcode',)
        fields = UserDetailsSerializer.Meta.fields + ('mobile_phone',)
        fields = UserDetailsSerializer.Meta.fields + ('avatar',)

    def update(self, instance, validated_data):
        # disable update username when updating the user
        username = validated_data.pop('username', None)

        profile_data = validated_data.pop('userprofile', {})

        # custom fields
        address = profile_data.get('address')
        city = profile_data.get('city')
        postcode = profile_data.get('postcode')
        mobile_phone = profile_data.get('mobile_phone')
        avatar = profile_data.get('avatar')
        
        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.address
        if profile_data and address:
            profile.address = address
            profile.save()

        profile = instance.city
        if profile_data and city:
            profile.city = city
            profile.save()

        profile = instance.postcode
        if profile_data and postcode:
            profile.postcode = postcode
            profile.save()

        profile = instance.mobile_phone
        if profile_data and mobile_phone:
            profile.mobile_phone = mobile_phone
            profile.save()

        profile = instance.avatar
        if profile_data and avatar:
            profile.avatar = avatar
            profile.save()

        return instance
