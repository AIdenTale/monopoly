import { Board } from "modules/gameplay/ui/board/Board";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlayerMovement } from "./movement/player";
import { useParams } from "react-router-dom";
import { PlayerWebsockets } from "./control/websockets";
// import { Outlet } from 'react-router-dom';

export function App() {

	const params = useParams()

	const boardRef = useRef(null)
	const root = useRef(null);

	const AttentionTable = useRef(null);
	const ChooseTable= useRef(null);
	const PlayerMovRef2 = useRef(null);

	const PlayerMovementNode = useRef<PlayerMovement>(null);
	const PlayerMovementRef = useRef<PlayerMovement>(null);
	const WebsocketController = useRef(null);
	const player1 = new PlayerMovement();
	PlayerMovementRef.current = player1;

	const player2 = new PlayerMovement()
	PlayerMovRef2.current = player2;

	const ws = new PlayerWebsockets(PlayerMovementRef, '12345', params.user_id, AttentionTable);
	const ids = params.user_id == '123' ? '321' : '123';
	ws.addPlayer(PlayerMovRef2, ids) 
	ws.connect_to_game_websocket()
	WebsocketController.current = ws;

	useEffect(() => {
		player1.setData(boardRef, root)
		player1.player_to_cell(1)

		player2.setData(PlayerMovementNode, root)
		player2.player_to_cell(1)
		console.log(AttentionTable)
		setTimeout(() => {
			ws.get_game_info();
		}, 1000);
	})
	return <Board node={boardRef} node2={PlayerMovementNode} root={root} p={WebsocketController} at={AttentionTable} cht={ChooseTable}/>;
}
