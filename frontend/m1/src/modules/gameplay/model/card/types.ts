import { EnumOf } from "shared/types/types";

export interface CardModel {
	name: string;
	translate_name: string;
	type: CardType;
	price_color : string;
	img: string;
	position: CardPosition;
	price?: number;
	group?: number;
	stars?: number;
	starsPrice?: number;
	rent?: number[];
}

export const CardPosition = {
	TOP: "top",
	RIGHT: "right",
	BOTTOM: "bottom",
	LEFT: "left",
	CORNER: "corner",
} as const;
export type CardPosition = EnumOf<typeof CardPosition>;

export const CardType = {
	PROPERTY: "property",
	START: "start",
	PRISON: "prison",
	TAX: "tax",
} as const;
export type CardType = EnumOf<typeof CardType>;
