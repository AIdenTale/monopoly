import { PlayerModel } from "modules/gameplay/model/player/types"
import { FC, useEffect, useRef, useState } from "react"

import cls from './player.m.scss'

interface PropsPlayer{
    player: PlayerModel
}

export const Player: FC<PropsPlayer> = props => {
    const player_data = props.player;

    const [activePlayer, setActivePlayer] = useState(1);

    return (
            <div className={cls.player__inner}  style={activePlayer === player_data.id ? {
                background: player_data.color,
            } : {}}>
                <div className={cls.player__image} >
                    <img style={{
                        border: "1px solid " + player_data.color
                    }} src={player_data.img} />
                </div>
                <div>
                    {player_data.name}
                </div>
                <div>
                    {player_data.balance} ₽
                </div>
            </div>
    )
}