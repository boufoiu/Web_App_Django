from django.urls import path, include
from rest_framework import routers
from . import views


urlpatterns = [
    #path('', include(router.urls)),
    path('api/', include([
        path('announcements/', include([
            path('', views.announcements, name='announcements'),
            path('me/', views.my_announcements, name='my_announcements'),
            path('<int:pk>/', views.announcement_detail, name='announcement_detail'),
            path('<int:pk>/favourite/', views.post_favourite, name='post_favourite'),
        ])),
        path('favourite/', views.my_favourite, name='my_favourite'),
        path('users/', include([
            path('',views.UsersViewSet, name= 'users' ),
            path('me/phone', views.update_phone_number, name='update_phone'),
            path('<str:pk>/admin', views.add_admin, name='add_admin'),
        ]))
        #path('announcements/',views.AnnouncementsViewSet, name= 'announcements' ),
    ])),
    
    path('login/', views.google_login, name='google_login'),
    path('login/auth/', views.google_authenticate, name='google_authenticate'),
    path('session/', views.session, name='session'),
    path('logout/', views.logout, name='logout'),
    path("chat/<str:chat_box_name>/", views.chat_box, name="chat"),
]
