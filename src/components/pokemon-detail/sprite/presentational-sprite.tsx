import { Suspense } from 'react';
import { Spinner } from '../../fallback/spinner';
import classes from './presentational-sprite.module.scss';
import fallback from '../../../assets/fallback.svg';
export interface PresentationalSpriteProps {
	label: string;
	url?: string;
}

export const PresentationalSprite = ({ label, url }: PresentationalSpriteProps) => {
	return (
		<div className={classes['sprite']}>
			{url ? (
				<div className={classes['pokemon-official-artwork']}>
					<Suspense fallback={<Spinner />}>
						<img src={url} alt={`${label}-official-artwork`} />
					</Suspense>
				</div>
			) : (
				<div className={classes['fallback-img']}>
					<img src={fallback} />
				</div>
			)}
			<span className={classes['label']}>{label}</span>
		</div>
	);
};
