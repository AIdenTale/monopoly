import Cookies from 'js-cookie';
import './rooms.m.scss';
import axios from 'axios';
import { useState } from 'react';
const Player = (props) => {
    console.log(props)
    return (
        <div key={props.key} className="player">
            <img src="http://127.0.0.1:8000/static/user.png"/>  
            <p>{props.name}</p>
        </div>
    )
}


export const Room = (props) => {
    const rooms = props.rooms

    const render_players = (room) => {
        let user_id = 0;
        const [user, setUser] = useState(0);
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"

        axios.get('http://127.0.0.1:8000/v1/user', {
        }).then((response) =>{
            setUser(response.data.user)
        })
        const is_creator = room.creator == user;
        return (
            <div className='room__indent'>
                {room.players.map((player, index) => {
                    return <Player name={player}/>
                })}
                {is_creator ? <></> : <button onClick={() => props.join(room.room_id)}>присоедениться</button>}
                {(room.players.length > 1 && is_creator) ? <button onClick={() => props.start(room.room_id)}>начать</button> : <></>}
            </div>
        )
    }

    return rooms.map((room, index) => {
        return (
            <div className="room">
                <div className="players">
                    {render_players(room)}
                </div>
            </div>
        )
    })

    
}