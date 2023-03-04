from django.urls import path, include
from rest_framework import routers
from . import views


urlpatterns = [
    #path('', include(router.urls)),
    path('api/', include([
        path("user/<str:pk>/", views.user, name="user"),
        path('announcements/', include([
            path('', views.announcements, name='announcements'),
            path('me/', views.my_announcements, name='my_announcements'),
            path('<int:pk>/',include([
                path('', views.announcement_detail, name='announcement_detail'),
                path('get_thumb/', views.get_thumb, name='get_thumb'),
                path('get_all_img/', views.get_all_img, name='get_all_img'),
                path('favourite/', views.post_favourite, name='post_favourite'),
                path('offer/', views.send_offer, name='send_offer'),
            ])),
        ])),

        path("offer/<int:pk>/response/", views.response_offer, name="response_offer"),
        path("responses/", views.get_responses, name="response_offer"),
        path('favourite/', views.my_favourite, name='my_favourite'),
        path('users/', include([
            path('',views.UsersViewSet, name= 'users' ),
            path('offers/', views.get_offers, name='get_offer'),
            path('me/phone', views.update_phone_number, name='update_phone'),
            path('<str:pk>/admin', views.add_admin, name='add_admin'),
        ]))
        #path('announcements/',views.AnnouncementsViewSet, name= 'announcements' ),
    ])),
    
    path('login/', views.google_login, name='google_login'),
    path('login/auth/', views.google_authenticate, name='google_authenticate'),
    path('session/', views.session, name='session'),
    path('logout/', views.logout, name='logout'),

    path('scraping/', views.scraping, name='scraping'),

]
