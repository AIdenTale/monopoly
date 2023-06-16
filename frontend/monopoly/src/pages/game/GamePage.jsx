import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import user_image from '../../assets/user.png';

import './game.css';

let ws_game = "";
let ws_chat = "";

const connect_websocket = (game_id) => {
    ws_game = new WebSocket("ws://127.0.0.1:8000/ws/game/"+game_id+"/")
    ws_chat = new WebSocket("ws://127.0.0.1:8000/ws/game/"+game_id+"/chat/")
}

const send_ws_message = (inputText) => {
    const json_message = {
        message : inputText
    }
    ws_chat.send(JSON.stringify(json_message))
}

const Player = ({player, activePlayer}) => {
    // ws_game = new WebSocket("ws://127.0.0.1:8000/ws/game/"+1+"/")
    // ws_chat = new WebSocket("ws://127.0.0.1:8000/ws/game/"+1+"/chat/")

    return (
        <div className="player__block" style={{
            background: activePlayer===player.id ? player.color : '#9FA2A3'
        }}>
            <div className="player__image" style={{
                border: '4px solid ' + player.color
            }} >
                <img src={player.image}/>
            </div>
            <div className="player__name" >{player.name}</div>
            <div className="player__balance">{player.balance} ₽</div>
        </div>
    )
}

const GamePage = () => {
    let params = useParams()
    let game_id = params.game_id

    const text_ref = useRef();

    useEffect(() => connect_websocket(game_id));
    const [activePlayer, setActivePlayer] = useState(1);

    let players = [
        {
            id: 1,
            color: "green",
            name: "user 1",
            image: user_image,
            is_creator: false,
            balance: 10000
        },
        {
            id: 2,
            color: "red",
            name: "user 2",
            image: user_image,
            is_creator: true,
            balance: 10000
        },
        {
            id: 3,
            color: "yellow",
            name: "user 3",
            image: user_image,
            is_creator: false,
            balance: 10000
        },
        {
            id: 4,
            color: "blue",
            name: "user 4",
            image: user_image,
            is_creator: false,
            balance: 10000
        },
    ]
    
    // return (
    //     <>
    //         <div>GamePage {params.game_id} </div>
    //         <input ref={text_ref} ></input>
    //         <button onClick={() => send_ws_message(text_ref.current.value)} >SEND</button>
    //     </>
    // )
    return (
        <div className="game">
            <div className="game__inner">
                <div className="players">
                    {
                        players.map((e) => {
                            return <Player player={e} activePlayer={activePlayer}/>
                        })
                    }
                </div>
                <div className="game__table"></div>
            </div>
        </div>
    )
}

export default GamePage;