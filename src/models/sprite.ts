export interface OtherSprites {
	other: {
		'official-artwork': OfficialArtwork;
	};
}

export interface OfficialArtwork {
	front_default: string;
	front_shiny: string;
}

export type Sprite = {
	[key: string]: string;
} & OtherSprites;
