export interface OtherSprites {
	other: {
		'official-artwork': {
			front_default: string;
			front_shiny: string;
		};
	};
}

export type Sprite = {
	[key: string]: string;
} & OtherSprites;
