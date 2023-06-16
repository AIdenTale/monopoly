import { useEffect, useRef, useState } from 'react';
import { Link, resolvePath } from 'react-router-dom';
import { Room } from './Thubms/Rooms';
import Header from '../../components/Header/Header';
import './searchpage.m.scss';

import Cookies from 'js-cookie';

Cookies.set('user_id', '123')

const SearchPage = () => {

    const [rooms, AddRooms] = useState([
        {
            id: "asdsadsad-dssadsa",
            creator: '123',
            players: [{
                name: '123',
            }],
            url: "http://localhost:3000"
        }
    ]);
    const leaveButton = useRef();
    const createButton = useRef();
    let search_websocket;

    useEffect(() => {
        search_websocket = new WebSocket("ws://127.0.0.1:8000/ws/search/")
        search_websocket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            if (data['t'] == 'connected'){
                const a = rooms
                
                let c = 0;
                for(let i = 0; i < a.length; ++i){
                    if (data.rooms[0] != rooms[i]) c++;
                    console.log(data.rooms[0], rooms[i])
                    console.log(rooms)
                }
                if(c == a.length){
                    a.push(data.rooms[0])
                    AddRooms(a);
                }
                
                
            }

            if(data['t'] == 'room_created'){
                console.log('pizdec')
                const r = Array(...rooms);
                r.push({
                    id: data['room_id'],
                    creator: data['creator'],
                    room_id: data['room_id']
                })
                AddRooms(r)
            }

            if(data['t'] == 'room_already_created'){
                
            }

            if (data['t'] == 'leave_room'){

            }
            
        }
    })

    const update_rooms = () => {
        return rooms.map((room, index) => {
            return (
                <Room room={room}/>
            )
        })
    }

    const createRoom = () => {
        console.log('CREATE ROOM')
        const message = JSON.stringify({
            event : "create_room",
            creator : Cookies.get('user_id'),
        })
        console.log(Cookies.get('user_id'));
        search_websocket.send(message)
    }
    const leaveRoom = () => {
        console.log("LEAVE ROOM")
        const message = JSON.stringify({
            event : "leave_room",
            user_id : Cookies.get('user_id')
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
                        <button>Создать игру</button>
                    </div>
                </div>
                {update_rooms()}
            </div>
            {/* <button ref={leaveButton} onClick={() => leaveRoom()}>Leave Room</button>
            <button ref={createButton} onClick={() => createRoom()}> Create</button> */}
        </div>
    )
}

export default SearchPage;