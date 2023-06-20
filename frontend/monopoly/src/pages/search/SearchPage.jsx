import { useEffect, useRef, useState } from 'react';
import { Link, resolvePath, useParams } from 'react-router-dom';
import { Room } from './Thubms/Rooms';
import Header from '../../components/Header/Header';
import './searchpage.m.scss';

import Cookies from 'js-cookie';
import axios from 'axios';



const SearchPage = () => {

    const [rooms, AddRooms] = useState([])
    const [rooms_l, AddLRooms] = useState([])
    const [connectedRoom, setConnectedRoom] = useState('');
    const params = useParams()
    // Cookies.set('session_id', params.user_id)
    let user_id = 0;
    let search_websocket;

    useEffect(() => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, access-control-allow-headers"

        axios.get('http://127.0.0.1:8000/v1/user', {
        }).then((response) =>{
            user_id = response.data.user
        })

        search_websocket = new WebSocket("ws://127.0.0.1:8000/ws/search/")
        search_websocket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            if (data['t'] == 'connected'){
                let b = 0;
                for(let i = 0; i < data.rooms.length; ++i){
                    if(rooms.length < 1){
                        AddRooms(data.rooms);
                        b = data.rooms.length;
                        // for(let i = 0; i< data.rooms.length; ++i){
                        //     for(let j=0; i < data.rooms[i].players.length; ++j){
                        //         console.log(data.rooms)
                        //         if (Cookies.get('session_id') == data.rooms[i].players[j]){
                        //             setConnectedRoom(data.rooms[i].room_id);
                        //             break;
                        //         }
                        //     }
                        // }
                        break;
                    }
                    if (data.rooms[i].room_id == rooms[i].room_id) b++;
                }
                // console.log(b, data.rooms.length)
                if (b != data.rooms.length){
                    AddRooms(data.rooms)
                }
                
            }

            if(data['t'] == 'room_already_created'){
                
            }

            if(data['t'] == 'leave_room'){
                setConnectedRoom('');
            }

            if (data['t'] == 'update'){
                AddRooms(data.rooms)
            }
            
            if(data['t'] == 'room_created'){
                setConnectedRoom(data.room_id)
            }

            if(data['t'] == 'game_started'){
                // window.location.replace('http://localhost:3000/'+Cookies.get('session_id'))
                window.location.replace('http://127.0.0.1:8000/'+user_id)
            }
        }
    })

    const update_rooms = () => {
        
    }
    
    const updateRooms = () => {
        axios.get(
            'http://127.0.0.1:8000/update_rooms/'
        ).then((response) => {console.log(response)})
        
    }

    const createRoom = () => {
        console.log('CREATE ROOM')

        const message = JSON.stringify({
            event : "create_room",
            creator : user_id,
        })

        search_websocket.send(message)
    }
    const leaveRoom = () => {
        console.log("LEAVE ROOM")
        const message = JSON.stringify({
            event : "leave_room",
            user_id : user_id
        })
        search_websocket.send(message)
    }

    const join_room = (room_id) => {
        const message = JSON.stringify({
            event : "join_room",
            player_id : user_id,
            room_id : room_id
        })

        search_websocket.send(message)
    }

    const start_game = (room_id) => {
        const message = JSON.stringify({
            event : "start_game",
            room_id : room_id
        })

        search_websocket.send(message)
    }

    return (
        <div className='rooms__block'>
            <Header/>
            <div className='rooms'>
                <div className="rooms__header">
                    <p>Ожидают игры</p>
                    <div className="rooms__header__button">
                        <button onClick={() => createRoom()} >Создать игру</button>
                        <button onClick={() => leaveRoom()} >Выйти</button>
                    </div>
                </div>
                <Room user_id={user_id} join={join_room} start={start_game} room={connectedRoom} rooms={rooms}/>
            </div>
            {/* <button ref={leaveButton} onClick={() => leaveRoom()}>Leave Room</button>
            <button ref={createButton} onClick={() => createRoom()}> Create</button> */}
        </div>
    )
}

export default SearchPage;