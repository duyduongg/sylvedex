import { Suspense } from 'react';
import { Spinner } from '../../fallback/spinner';
import classes from './presentational-sprite.module.scss';
import fallback from '../../../assets/fallback.svg';
export interface PresentationalSpriteProps {
	label: string;
	url?: string;
	isLoaded: boolean;
	onImageLoadedHandler: () => void;
}

export const PresentationalSprite = ({ label, url, isLoaded, onImageLoadedHandler }: PresentationalSpriteProps) => {
	return (
		<div className={classes['sprite']}>
			{url ? (
				<div className={classes['pokemon-official-artwork']}>
					<Suspense fallback={<Spinner />}>
						<img src={url} alt={`${label.toLowerCase()}-official-artwork`} onLoad={onImageLoadedHandler} />
					</Suspense>
				</div>
			) : (
				<div className={classes['fallback-img']}>
					<img src={fallback} />
				</div>
			)}
			{(isLoaded || url === null) && (
				<span className={`${classes['label']} ${url === null && classes['fallback-label']}`}>{label}</span>
			)}
		</div>
	);
};
