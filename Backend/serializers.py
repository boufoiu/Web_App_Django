from .models import User , Admin , Announcement, Favourite
from rest_framework import serializers 


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['FirstName','LastName','PfP','PhoneNumber','Email']
        

class AnnouncementSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id','PubDate','Title','Description','Price','Type','Category', 'Wilaya', 'Commune', 'Adress','Owner_id']
        

class FavouriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Favourite
        fields = ['user','announcement']
       