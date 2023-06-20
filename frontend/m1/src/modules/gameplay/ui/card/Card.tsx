import classNames from "classnames";
import { CardModel, CardPosition } from "modules/gameplay/model/card/types";
import { CSSProperties, FC, useEffect, useRef } from "react";
import cls from "./card.m.scss";

interface CardProps {
	cardModel: CardModel;
	style?: CSSProperties;
}

export const Card: FC<CardProps> = props => {
	const { cardModel, style } = props;

	let directionClass;
	switch (cardModel.position) {
		case CardPosition.BOTTOM:
			directionClass = cls.bottom;
			break;
		case CardPosition.LEFT:
			directionClass = cls.left;
			break;
		case CardPosition.RIGHT:
			directionClass = cls.right;
			break;
		case CardPosition.TOP:
			directionClass = cls.top;
			break;
		case CardPosition.CORNER:
			directionClass = cls.corner;
			break;
		default:
	}

	return (
		<div
			className={classNames(cls.root, directionClass)}
			style={style}
			onClickCapture={() => alert(cardModel.name)}
		>
			<div className={cls["img-container"]}>
				<img
					src={cardModel.img}
					alt="img"
				/>
			</div>
			{cardModel.price && <div style={{background: cardModel.price_color}} className={cls.price}>{cardModel.price <= 9999 ? 

			cardModel.price.toString().slice(0,1) + "," + cardModel.price.toString().slice(1) : 
			cardModel.price.toString().slice(0,2) + "," + cardModel.price.toString().slice(2)}</div>}

			{/* {cardModel.name && <p className={cls.card__name}>{cardModel.translate_name}</p>} */}
		</div>
	);
};
