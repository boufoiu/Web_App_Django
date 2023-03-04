from django.urls import path
from . import consumers

# URLs that handle the WebSocket connection are placed here.
websocket_urlpatterns=[
    path(
        'ws/chat/<str:chat_box_name>', consumers.ChatRoomConsumer.as_asgi()
    ),
]
