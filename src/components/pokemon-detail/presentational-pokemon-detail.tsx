import { Suspense, useCallback } from 'react';
import fallback from '../../assets/fallback.svg';
import { capitalize, CombinedAbilities, format } from '../../helpers/helpers';
import { Pokemon, Stat } from '../../models';
import { Spinner } from '../fallback/spinner';
import classes from './presentational-pokemon-detail.module.scss';
export interface PresentationalPokemonDetailProps {
	data: Pokemon;
	combinedAbilities: CombinedAbilities[];
}
interface SubInfoSectionProps {
	label: string;
	info: number | string;
	unitMeasurement: string;
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

export const PresentationalPokemonDetail = ({ data, combinedAbilities }: PresentationalPokemonDetailProps) => {
	const formatString = useCallback(
		(str: string) => {
			return format(str);
		},
		[data]
	);

	const capitalizeString = useCallback(
		(str: string) => {
			return capitalize(str);
		},
		[data]
	);

	const getTotalStat = useCallback((stats: Stat[]) => {
		let a: number[] = [];
		stats.forEach((stat) => {
			a.push(stat.base_stat);
		});
		return a.reduce((acc, cur) => {
			return acc + cur;
		}, 0);
	}, []);
	return (
		<div className={classes['presentational-container']}>
			{data.sprites.other['official-artwork'].front_default ? (
				<div className={classes['pokemon-official-artwork']}>
					<Suspense fallback={<Spinner />}>
						<img src={data.sprites.other['official-artwork'].front_default} alt={`${data.name}-official-artwork`} />
					</Suspense>
				</div>
			) : (
				<div className={classes['fallback-img']}>
					<img src={fallback} />
				</div>
			)}
			<div className={classes['pokemon-id']}>#{data.id}</div>
			<div className={classes['pokemon-name']}>{capitalizeString(data.name)}</div>
			<div className={classes['pokemon-type']}>
				<div className={`type-${data.types[0].type.name} ${classes['type']}`}>
					{capitalizeString(data.types[0].type.name)}
				</div>
				{data.types[1] && (
					<div className={`type-${data.types[1].type.name} ${classes['type']}  `}>
						{capitalizeString(data.types[1].type.name)}
					</div>
				)}
			</div>
			<div className={classes['abilities']}>
				<div className={classes['label']}>ABILITIES</div>
				<div className={classes['abilities-container']}>
					{combinedAbilities.map((ability) => (
						<div className={classes['ability']} key={ability.name}>
							{ability.name}
							<span className={classes['ability-description']}>{ability.description}</span>
						</div>
					))}
				</div>
			</div>
			<div className={classes['sub-info']}>
				<SubInfoSection label="Height" info={data.height ? data.height / 10 : 'N/A'} unitMeasurement="m" />
				<SubInfoSection label="Weight" info={data.weight / 10} unitMeasurement="kg" />
				<SubInfoSection
					label="Base Exp"
					info={data.base_experience ? data.base_experience : 'N/A'}
					unitMeasurement=""
				/>
			</div>
			<div className={classes['stats']}>
				<div className={classes['label']}>STATS ( /255 )</div>
				<div className={classes['stats-container']}>
					{data.stats.map((stat, idx) => (
						<div className={classes['stat-container']} key={idx}>
							<div className={classes['numeric-value']}>
								<div className={classes['stat-name']}>{formatString(stat.stat.name)}:</div>
								<div className={classes['base-stat']}>{stat.base_stat}</div>
							</div>
							<div
								className={`${classes['chart']} stat-${stat.stat.name}`}
								style={{ width: `calc(100% * (${stat.base_stat} / 255))` }}
							></div>
						</div>
					))}
					<div className={classes['stat-container']}>
						<div className={classes['numeric-value']}>
							<div className={classes['stat-name']}>Total:</div>
							<div className={classes['base-stat']}>{getTotalStat(data.stats)}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
