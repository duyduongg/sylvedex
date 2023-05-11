import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NestedRelatedPokemon } from '../../app/reducers/pokemon-detail-slice';
import { POKEMON_ID_LIMIT } from '../../constants';
import { CombinedAbility } from '../../helpers';
import { PokemonType, Stat } from '../../models';
import { OfficialArtwork } from '../../models/pokemon/sprite';
import { ContainerAbilities } from './ability/container-abilities';
import { PresentationalEvolutionChain } from './evolution/presentational-evolution-chain';
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
	evolutionChain: NestedRelatedPokemon[];
	onIdChangeHandler: (id: number, isForward?: boolean) => void;
	formatString: (str: string) => string;
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
	evolutionChain,
	onIdChangeHandler,
	formatString
}: PresentationalPokemonDetailProps) => {
	return (
		<div className={classes['presentational-container']}>
			<PresentationalSprites spriteImages={spriteImages} />
			<div className={classes['pokemon-id']}>#{id}</div>
			<div className={classes['sub-container']}>
				<div
					className={`${classes['action-btn']} ${id === 1 && classes['disabled']} ${classes['backward-btn']}`}
					onClick={() => onIdChangeHandler(-1, false)}
				>
					<FontAwesomeIcon icon={faChevronLeft} className={classes['icon']} />
				</div>
				<div className={classes['pokemon-name']}>{name}</div>
				<div
					className={`${classes['action-btn']} ${id >= POKEMON_ID_LIMIT && classes['disabled']} ${
						classes['forward-btn']
					}`}
					onClick={() => onIdChangeHandler(1, true)}
				>
					<FontAwesomeIcon icon={faChevronRight} className={classes['icon']} />
				</div>
			</div>
			<ContainerTypes types={types} format={formatString} />
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
			<div className={classes['evolution-chain']}>
				<div className={classes['label']}>EVOLUTION</div>
				<PresentationalEvolutionChain
					chain={evolutionChain}
					formatString={formatString}
					onIdChangeHandler={onIdChangeHandler}
				/>
			</div>
		</div>
	);
};
