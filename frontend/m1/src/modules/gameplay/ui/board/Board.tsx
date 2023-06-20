import { CardModel, CardPosition } from "modules/gameplay/model/card/types";
import { Card } from "../card/Card";
import { Layer, Stage, Circle } from "react-konva";
import { AttenttionTable, ChooseTable } from "../table/attention";

import cls from "./board.m.scss";
import data from "./cards.json";

import { useState, useRef } from "react";
import { Chat } from "./Thumb/Chat";

import { Player } from "../player/player";
import { PlayerModel } from "modules/gameplay/model/player/types";

let nodes : object;
let playerPos : number

let playerX : number
let playerY : number
export const Board = (props: any) => {
	const node1 = useRef<any | null>(null);
	const canvas = useRef<any | null>(null);
	const root = useRef<any | null>(null);
	const cards = data.cards;

	playerX = 0;
	playerY = 0;

	let corner_card: any;
	let delta: number;
	let deltaY: number;
	let card: any;
	let card_price: any;
	let card_vertical: any;
	let corner_right_bottom_coords = 0;
	let corner_right_top_coords = 0;

	const [playerPos, setPlayerPos] = useState(1);

	const buildBoard = () => {
		let topCount = 1;
		let rightCount = 1;
		let bottomCount = 1;
		let leftCount = 1;
		let cornerCount = 1;

		return cards.map((card, index) => {
			let gridArea = "";
			if (card.position === CardPosition.TOP) gridArea = `top${topCount++}`;
			if (card.position === CardPosition.LEFT) gridArea = `left${leftCount++}`;
			if (card.position === CardPosition.RIGHT) gridArea = `right${rightCount++}`;
			if (card.position === CardPosition.BOTTOM) gridArea = `btm${bottomCount++}`;
			if (card.position === CardPosition.CORNER) gridArea = `corner${cornerCount++}`;

			return (
				<Card
					style={{ gridArea }}
					cardModel={card as CardModel}
					key={index}
				/>
			);
		});
	};

	const players = [
		{
			id: 123,
			name: "123",
			color: "green",
			balance: 100000,
			img: "http://127.0.0.1:8000/static/user.png"
		},
		{
			id: 321,
			name: "123",
			color: "blue",
			balance: 100000,
			img: "http://127.0.0.1:8000/static/user.png"
		},
	]

	return (
		<div ref={props.root} className={cls.table}>
			<div className={cls.table__inner}>
				<div className={cls.table__players}>
					{
						players.map((player, index) => {
							return <Player player={player as PlayerModel} />
						})
					}
				</div>
			<div className={cls.root}>
				{buildBoard()} 
				<div className={cls.center_board}>
					<AttenttionTable vibible={false} refm={props.at} buttonRef={props.p} />
					<ChooseTable ref={props.cht} vibible={false} />
					<Chat/>
				</div>
				<Stage className={cls.canvas__block} refm={canvas} width={1147} height={932}>
					<Layer>
						{/* <Star draggable onClick={(e) => handleClickStar(e)} ref={node1} onDragStart={handleClick} onDragEnd={handleClick} width={starWidth} fill="#fff" key={1} numPoints={5} innerRadius={20} outerRadius={50} x={100} y={100} /> */}
						<Circle x={0} y={0} fill="#fff" radius={20} ref={props.node} />
						<Circle x={0} y={0} fill="#000" radius={20} ref={props.node2} />
					</Layer>
				</Stage>
			</div>
			</div>
		</div>
	);
};
