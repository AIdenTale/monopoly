import json
import uuid
from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from channels_redis.core import RedisChannelLayer

import redis

r = redis.Redis(port=6380)

class SearchGamesConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super(SearchGamesConsumer, self).__init__(*args, **kwargs)
        self.room_name = 'room_search'
        self.rooms = {}

    def connect(self):
        print('[search page] websocket connected')
        channel_layer = get_channel_layer()

        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name
        )
        self.accept()
        async_to_sync(self.channel_layer.send)(
            self.channel_name,
            {
                "type": "send_search_game"
            }
        )
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_name,
        #     {
        #         "type": "send_search_game",
        #     }
        # )

    def send_search_game(self, event):
        rm = r.get("rooms")
        if rm is None:
            rooms = []
        else:
            rooms = [

                {
                    "room_id" : i,
                    "players" : json.loads(r.get(i)),
                    "creator": json.loads(r.get(i))[0]
                } for i in [x for x in json.loads(rm)]

                ]
            print(rooms)

        self.send(text_data=json.dumps({
            "t" : "connected",
            "rooms" : rooms
        }))

    def disconnect(self, code):
        print(f"Disconnected with code {code}")
        async_to_sync(self.channel_layer.group_discard)(
           self.room_name,
           self.channel_name 
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        event = text_data_json['event']
        
        if event == "create_room":
            creator_id = text_data_json['creator']
            print(r.get(creator_id))
            if r.get(creator_id):
                self.send(text_data=json.dumps({
                    "t": "room_already_created"
                }))
                return
            room_id = uuid.uuid4()

            r.mset({
                creator_id : str(room_id)
            })
            r.mset({
                str(room_id) : json.dumps([
                    creator_id
                ])
            })
            r.mset({
                "rooms" : json.dumps([str(room_id)])
            })
            data = {
                "t" : "room_created",
                "creator" : creator_id, 
                "players" : 1,
                'room_id' : str(room_id)
            }
            

            

            self.send(text_data=json.dumps(
                data
            ))

        elif event == "join_room":
            pass

        elif event == "leave_room":
            user_id = text_data_json['user_id']
            room = r.get(user_id)
            # leaveButton.current.style.display = 'none'
            users = json.loads(r.get(room))
            users.pop(users.index(user_id))

            r.delete(user_id)
            r.mset({
                str(room)[1:len(str(room))] : json.dumps(users)
            })



            self.send(text_data=json.dumps({
                "t" : "leave_room",
                "status" : "success"
            }))





class GameConsumer(WebsocketConsumer):
    def connect(self):
        print('[game] websocket connected')
        self.accept()

    def disconnect(self, code):
        print(f"Disconnected with code {code}")

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        print(message)
        self.send(text_data=json.dumps({"message": message}))

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print('[chat] websocket connected')
        self.accept()

    def disconnect(self, code):
        print(f"Disconnected with code {code}")

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        print(message)
        self.send(text_data=json.dumps({"message": message}))