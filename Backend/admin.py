from django.contrib import admin
from .models import User, Announcement, Favourite, Photo, Admin, Channel, Message

class UserAdmin(admin.ModelAdmin):
    list_display = ['FirstName','Email']

class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['Owner','pk']
    list_filter = ['PubDate','Title']


class FavouriteAdmin(admin.ModelAdmin):
    list_display = ['user','announcement','pk']
    
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['announcement','image']

class AdminAdmin(admin.ModelAdmin):
    list_display = ['Me']
    
admin.site.register(User, UserAdmin)
admin.site.register(Announcement,AnnouncementAdmin)
admin.site.register(Favourite, FavouriteAdmin)
admin.site.register(Photo, PhotoAdmin)
admin.site.register(Admin,AdminAdmin)
admin.site.register(Channel)
admin.site.register(Message)
