import { OfficialArtwork } from '../../../models/sprite';
import classes from './container-sprites.module.scss';
import { PresentationalSprite } from './presentational-sprite';
export interface ContainerSpritesProps {
	spriteImages: OfficialArtwork;
}
export const ContainerSprites = ({ spriteImages }: ContainerSpritesProps) => {
	return (
		<div className={classes['container-sprites']}>
			<PresentationalSprite url={spriteImages.front_default} label="Default" />
			<PresentationalSprite url={spriteImages.front_shiny} label="Shiny" />
		</div>
	);
};
