from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_auth.serializers import UserDetailsSerializer


class UserSerializer(UserDetailsSerializer):

    # not required field
    address = serializers.CharField(source="userprofile.address", allow_null=True, allow_blank=True, default="")
    city = serializers.CharField(source="userprofile.city", allow_null=True, allow_blank=True, default="")
    postcode = serializers.CharField(source="userprofile.postcode", allow_null=True, allow_blank=True, default="")
    mobile_phone = serializers.CharField(source="userprofile.mobile_phone", allow_null=True, allow_blank=True, default="")
    avatar = serializers.CharField(source="userprofile.avatar", allow_null=True, allow_blank=True, default="")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields = ('pk', 'email', 'first_name', 'last_name', 'address', 'city', 'postcode', 'mobile_phone', 'avatar', )

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('userprofile', {})
        
        address = profile_data.get('address')
        city = profile_data.get('city')
        postcode = profile_data.get('postcode')
        mobile_phone = profile_data.get('mobile_phone')
        avatar = profile_data.get('avatar')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and address:
            profile.address = address
            profile.save()

        if profile_data and address:
            profile.address = address
            profile.save()

        if profile_data and city:
            profile.city = city
            profile.save()

        if profile_data and postcode:
            profile.postcode = postcode
            profile.save()

        if profile_data and mobile_phone:
            profile.mobile_phone = mobile_phone
            profile.save()

        if profile_data and avatar:
            profile.avatar = avatar
            profile.save()
        return instance
