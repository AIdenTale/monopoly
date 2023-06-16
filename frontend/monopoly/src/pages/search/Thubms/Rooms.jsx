import './rooms.m.scss';

const Player = (props) => {
    console.log(props)
    return (
        <div className="player">
            <img onClick={() => window.location.replace(props.url)} src="http://127.0.0.1:8000/static/user.png"/>  
            <p>{props.name}</p>
        </div>
    )
}


export const Room = (props) => {
    const room = props.room
    console.log(props)
    const render_players = () => {
        return room.players.map((player, index) => {
            // console.log(room.url)
            return <Player url={room.url} name={player.name}/>
        })
    }

    return (
        <div className="room">
            <div className="players">
                {render_players()}
            </div>
        </div>
    )
}