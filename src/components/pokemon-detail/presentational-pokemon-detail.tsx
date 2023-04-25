import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { POKEMON_ID_LIMIT } from '../../constants';
import { capitalize, CombinedAbility, format } from '../../helpers/helpers';
import { PokemonType, Stat } from '../../models';
import { OfficialArtwork } from '../../models/sprite';
import { ContainerAbilities } from './ability/container-abilities';
import classes from './presentational-pokemon-detail.module.scss';
import { PresentationalSprites } from './sprite/presentational-sprites';
import { ContainerStats } from './stat/container-stats';
import { ContainerTypes } from './type/container-types';
export interface PresentationalPokemonDetailProps {
	id: number;
	name: string;
	spriteImages: OfficialArtwork;
	types: PokemonType[];
	combinedAbilities: CombinedAbility[];
	height?: number;
	weight?: number;
	baseExp?: number;
	stats: Stat[];
	onIdChangeHandler: (offset: number) => void;
}
interface SubInfoSectionProps {
	label: string;
	info: number | string;
	unitMeasurement?: string;
}
const SubInfoSection = ({ label, info, unitMeasurement }: SubInfoSectionProps) => {
	return (
		<div className={classes['sub-info-section']}>
			<div className={classes['label']}>{label.toUpperCase()}</div>
			<div className={classes['info']}>
				<span>{info}</span>
				{info !== 'N/A' && <span>{unitMeasurement}</span>}
			</div>
		</div>
	);
};

export const PresentationalPokemonDetail = ({
	id,
	name,
	spriteImages,
	types,
	combinedAbilities,
	height,
	weight,
	baseExp,
	stats,
	onIdChangeHandler
}: PresentationalPokemonDetailProps) => {
	const formatString = useCallback(
		(str: string) => {
			return format(str);
		},
		[name]
	);

	const capitalizeString = useCallback(
		(str: string) => {
			return capitalize(str);
		},
		[name]
	);

	return (
		<div className={classes['presentational-container']}>
			<PresentationalSprites spriteImages={spriteImages} />
			<div className={classes['pokemon-id']}>#{id}</div>
			<div className={classes['sub-container']}>
				<div
					className={`${classes['action-btn']} ${id === 1 && classes['disabled']}`}
					onClick={() => onIdChangeHandler(-1)}
				>
					<FontAwesomeIcon icon={faChevronLeft} className={classes['icon']} />
				</div>
				<div className={classes['pokemon-name']}>{formatString(capitalizeString(name))}</div>
				<div
					className={`${classes['action-btn']} ${id >= POKEMON_ID_LIMIT && classes['disabled']}`}
					onClick={() => onIdChangeHandler(1)}
				>
					<FontAwesomeIcon icon={faChevronRight} className={classes['icon']} />
				</div>
			</div>
			<ContainerTypes types={types} format={capitalizeString} />
			<div className={classes['abilities']}>
				<div className={classes['label']}>ABILITIES</div>
				<ContainerAbilities abilities={combinedAbilities} />
			</div>
			<div className={classes['sub-info']}>
				<SubInfoSection label="Height" info={height || 'N/A'} unitMeasurement="m" />
				<SubInfoSection label="Weight" info={weight || 'N/A'} unitMeasurement="kg" />
				<SubInfoSection label="Base Exp" info={baseExp || 'N/A'} />
			</div>
			<div className={classes['stats']}>
				<div className={classes['label']}>STATS ( /255 )</div>
				<ContainerStats stats={stats} formatString={formatString} />
			</div>
		</div>
	);
};
