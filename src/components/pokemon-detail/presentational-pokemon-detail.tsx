import { Suspense, useCallback } from 'react';
import fallback from '../../assets/fallback.svg';
import { capitalize, CombinedAbility, format } from '../../helpers/helpers';
import { Pokemon, PokemonType, Stat } from '../../models';
import { Spinner } from '../fallback/spinner';
import { ContainerAbilities } from './ability/container-abilities';
import classes from './presentational-pokemon-detail.module.scss';
import { ContainerStats } from './stat/container-stats';
import { TypesContainer } from './type/container-types';
export interface PresentationalPokemonDetailProps {
	id: number;
	name: string;
	spriteImage?: string;
	types: PokemonType[];
	combinedAbilities: CombinedAbility[];
	height?: number;
	weight?: number;
	baseExp?: number;
	stats: Stat[];
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
	spriteImage,
	types,
	combinedAbilities,
	height,
	weight,
	baseExp,
	stats
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
			{spriteImage ? (
				<div className={classes['pokemon-official-artwork']}>
					<Suspense fallback={<Spinner />}>
						<img src={spriteImage} alt={`${name}-official-artwork`} />
					</Suspense>
				</div>
			) : (
				<div className={classes['fallback-img']}>
					<img src={fallback} />
				</div>
			)}
			<div className={classes['pokemon-id']}>#{id}</div>
			<div className={classes['pokemon-name']}>{formatString(capitalizeString(name))}</div>
			<TypesContainer types={types} format={capitalizeString} />
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
