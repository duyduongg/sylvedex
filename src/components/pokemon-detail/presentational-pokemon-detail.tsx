import { Suspense } from 'react';
import { Pokemon } from '../../models/pokemon';
import classes from './presentational-pokemon-detail.module.scss';
import fallback from '../../assets/fallback.svg';
import { MoonLoader } from 'react-spinners';
import { capitalize, format } from '../../helpers/helpers';
export interface PresentationalPokemonDetailProps {
	data: Pokemon;
}
interface SubInfoSectionProps {
	label: string;
	info: number;
	unitMeasurement: string;
}
const SubInfoSection = ({ label, info, unitMeasurement }: SubInfoSectionProps) => {
	return (
		<div className={classes['sub-info-section']}>
			<div className={classes['label']}>{label.toUpperCase()}</div>
			<div className={classes['info']}>
				<span>{info}</span>
				<span>{unitMeasurement}</span>
			</div>
		</div>
	);
};

export const PresentationalPokemonDetail = ({ data }: PresentationalPokemonDetailProps) => {
	return (
		<div className={classes['presentational-container']}>
			{data.sprites.other['official-artwork'].front_default ? (
				<div className={classes['pokemon-official-artwork']}>
					<Suspense fallback={<MoonLoader />}>
						<img src={data.sprites.other['official-artwork'].front_default} alt={`${data.name}-official-artwork`} />
					</Suspense>
				</div>
			) : (
				<div className={classes['fallback-img']}>
					<img src={fallback} />
				</div>
			)}
			<div className={classes['pokemon-id']}>#{data.id}</div>
			<div className={classes['pokemon-name']}>{capitalize(data.name)}</div>
			<div className={classes['pokemon-type']}>
				<div className={`type-${data.types[0].type.name} ${classes['type']}`}>
					{capitalize(data.types[0].type.name)}
				</div>
				{data.types[1] && (
					<div className={`type-${data.types[1].type.name} ${classes['type']}  `}>
						{capitalize(data.types[1].type.name)}
					</div>
				)}
			</div>
			<div className={classes['abilities']}>
				<div className={classes['label']}>ABILITIES</div>
				<div className={classes['abilities-container']}>
					{data.abilities.map((ability) => (
						<div className={classes['ability']} key={ability.slot}>
							{format(ability.ability.name)}
						</div>
					))}
				</div>
			</div>
			<div className={classes['sub-info']}>
				<SubInfoSection label="Height" info={data.height / 10} unitMeasurement="m" />
				<SubInfoSection label="Weight" info={data.weight / 10} unitMeasurement="kg" />
				<SubInfoSection label="Base Exp" info={data.base_experience} unitMeasurement="" />
			</div>
			<div className={classes['stats']}>
				<div className={classes['label']}>STATS</div>
				<div className={classes['stats-container']}>
					{data.stats.map((stat, idx) => (
						<div className={classes['stat-container']} key={idx}>
							<div className={classes['numeric-value']}>
								<div className={classes['stat-name']}>{format(stat.stat.name)}:</div>
								<div className={classes['base-stat']}>{stat.base_stat}</div>
							</div>
							<div
								className={`${classes['chart']} stat-${stat.stat.name}`}
								style={{ width: `calc(100% * (${stat.base_stat} / 255))` }}
							></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
