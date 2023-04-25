import { OfficialArtwork } from '../../../models/sprite';
import { ContainerSprite } from './container-sprite';
import classes from './presentational-sprites.module.scss';
export interface PresentationalSpritesProps {
	spriteImages: OfficialArtwork;
}
export const PresentationalSprites = ({ spriteImages }: PresentationalSpritesProps) => {
	return (
		<div
			className={`${classes['container-sprites']} ${
				(spriteImages.front_default === null || spriteImages.front_shiny === null) && classes['fallback']
			}`}
		>
			<ContainerSprite url={spriteImages.front_default} label="Default" />
			<ContainerSprite url={spriteImages.front_shiny} label="Shiny" />
		</div>
	);
};
