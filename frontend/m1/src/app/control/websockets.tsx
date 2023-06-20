import { Dictionary } from "@reduxjs/toolkit"
import { PlayerMovement } from "app/movement/player"
export class PlayerWebsockets
{
    gws: any
    chat_websocket: any
    player_control: PlayerMovement
    game_id: string
    player_controllers: any;
    user_id: any

    att: any;
    is_first: boolean;
    games: any;

    constructor(playerMovement: PlayerMovement, game_id: string, user_id: string, AttentionTable:any){
        this.player_control = playerMovement;
        this.game_id = game_id;
        this.user_id = user_id
        this.att = AttentionTable;
        this.player_controllers = {
            user_id : playerMovement
        }
        console.log(game_id, user_id)
        this.games = {}
        this.games[this.game_id] ={}
        this.games[this.game_id][this.user_id] = playerMovement
        this.is_first = false;
    }

    addPlayer(playerMove: any, id: any)
    {
        this.games[this.game_id][id] = playerMove;
    }

    connect_to_game_websocket(){
        this.gws = new WebSocket("ws://127.0.0.1:8000/ws/game/"+this.game_id+"/")
        this.gws.onmessage = (response: any) => this.handleEvents(response, this.games, this.user_id);
    }   

    send_ws(message: Dictionary<any>){
        this.gws.send(JSON.stringify(message))
    }

    get_game_info(){
        const message = {
            "event" : "connected",
            "user_id": this.user_id
        }
        this.send_ws(message);
    }

    drop_cube(){
        const cube_i = Math.floor(Math.random() * 13) +1;
        console.log("CUBE I", cube_i)
        const playerController = this.games[this.game_id][this.user_id]


        // playerController.current.player_move(cube_i)
        this.send_ws({
            "event" : "drop",
            "user_id" : this.user_id,
            "cube_i" : cube_i
        })
    }

    handleEvents(response: any, games: any, user_id : any){
        const data = JSON.parse(response.data);
        console.log(data)

        if (data['t'] == 'drop'){
            console.log(games)
            const playerController = games[this.game_id][data['user_id']]
            playerController.current.player_move(data['cube_i'])
        }
    }
}