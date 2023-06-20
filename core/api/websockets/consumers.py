import json
import uuid
from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json
from api.models import Game
import os
import redis

r = redis.Redis(port=6380)
r.mset({
    'rooms' : json.dumps([])
})

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
                "type": "send_search_game",
                "t" : 'connected'
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
            "t" : event['t'],
            "rooms" : rooms
        }))
        

    def game_start(self, event):
        self.send(text_data=json.dumps({
            "t" : 'game_started',
            'room_id' : event['room_id']
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
        print('data recived', text_data_json)
        if event == "create_room":
            creator_id = text_data_json['creator']

            if r.get(creator_id):
                self.send(text_data=json.dumps({
                    "t": "room_already_created"
                }))
                return
            room_id = uuid.uuid4()

            os.system('cls')

            r.mset({
                creator_id : str(room_id)
            })
            r.mset({
                str(room_id) : json.dumps([
                    creator_id
                ])
            })
            print('aldes')
            rooms = r.get('rooms')
            print(rooms is None)
            if rooms is None:
                rooms = []
            else:
                rooms = json.loads(rooms)
                rooms.append(str(room_id))
            print(rooms)
            r.mset({
                "rooms" : json.dumps(rooms)
            })
            print(r.get('rooms'))
            self.send(text_data=json.dumps({
                "t" : "room_created",
                'room_id' : str(room_id)
            }))

            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                {
                    "type": "send_search_game",
                    't' : 'update'
                }
            )

        elif event == "join_room":
            player = r.get(text_data_json['player_id'])
            if player:
                self.send(text_data=json.dumps({
                    "status" : 'error'
                }))
                return

            room_id = text_data_json['room_id']
            room = json.loads(r.get(room_id))

            player_id = text_data_json['player_id']
            room.append(player_id)

            r.mset({
                str(room_id) : json.dumps(room)
            })
            
            r.mset({
                player_id : room_id
            })

            self.send(text_data=json.dumps({
                "status" : 'success'
            }))

            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                {
                    "type": "send_search_game",
                    't' : 'update'
                }
            )

        elif event == "leave_room":
            print("LEAVE ROOM")
            user_id = text_data_json['user_id']
            room = r.get(user_id)
            users = json.loads(r.get(room))
            users.pop(users.index(user_id))
            os.system('cls')
            r.delete(user_id)
            r.mset({
                room : json.dumps(users)
            })

            rooms = json.loads(r.get('rooms'))
            print(rooms)
            for room in rooms:
                players = json.loads(r.get(room))
                print(text_data_json['user_id'], " ", players)
                if (text_data_json['user_id'] in players and len(players) == 1) or len(players) == 0:
                    rooms.pop(rooms.index(room))
            print(rooms)
            r.mset({
                'rooms' : json.dumps(rooms)
            })


            self.send(text_data=json.dumps({
                "t" : "leave_room",
                "status" : "success"
            }))

            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                {
                    "type": "send_search_game",
                    't' : 'update'
                }
            )
        elif event == 'start_game':
            game_id = uuid.uuid4()
            room_id = text_data_json['room_id']
            players = json.loads(r.get(room_id))

            pl = ''
            for i,x in enumerate(players):
                pl += x + "|" if i != len(players)-1 else x
            Game.objects.create(
                game_id=game_id,
                players=pl
            )

            async_to_sync(self.channel_layer.group_send)(
                self.room_name,
                {
                    "type": "game_start",
                    'room_id' : room_id,
                    't' : 'game_started'
                }
            )






class GameConsumer(WebsocketConsumer):
    def connect(self):
        print('[game] websocket connected')

        self.accept()

    def disconnect(self, code):
        print(f"Disconnected with code {code}")

    def send_drop(self, event):
        self.send(text_data=json.dumps({
            "t" : "drop",
            "user_id" : event['user_id'],
            "cube_i" : event["cube_i"]
        }))

    def start(self, event):
        self.send(text_data=json.dumps({
            "t" : "start"
        }))

    def receive(self, text_data):
        # os.system('cls')
        text_data_json = json.loads(text_data)
        event = text_data_json['event']
        game_id = '12345'
        if event == 'connected':

            

            async_to_sync(self.channel_layer.group_add)(
                game_id,
                self.channel_name
            )
            allow_start = False
            game = r.get(game_id)
            if str(game) == 'None' or json.loads(game) is None:
                r.mset({
                    game_id : json.dumps({
                        "players" : [{
                            "user_id" : text_data_json['user_id'],
                            "balance" : 100000
                        }],
                        'creator': text_data_json['user_id']
                    })
                })
            else:
                game = json.loads(game)
                if text_data_json['user_id'] not in [x['user_id'] for x in game['players']]:
                    game['players'].append({
                        "user_id" : text_data_json['user_id'],
                        "balance" : 100000
                    })
                    allow_start = True
            
            r.mset({
                game_id : json.dumps(game)
            })
            self.send(text_data=json.dumps({
                "t" : "game_info",
                game_id : game,
            }))

            print('ALLOW START')
            allow_start = False
            async_to_sync(self.channel_layer.group_send)(
            game_id,
            {
                "type": "start",
            }
            )

        elif event == 'drop':
            cube_i = text_data_json['cube_i']
            user_id = text_data_json['user_id']

            async_to_sync(self.channel_layer.group_send)(
                game_id,
                {
                    "type": "send_drop",
                    "cube_i" : cube_i,
                    "user_id" : user_id
                }
            )

        

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