import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { Pokemon } from '../../../models/pokemon';
import classes from './pokemon-list-item.module.scss';
import fallback from '../../../assets/fallback.svg';
export interface PokemonListItemProps {
	data: Pokemon;
}
export const PokemonListItem = ({ data }: PokemonListItemProps) => {
	const capitalize = (name: string) => {
		return name.at(0)?.toUpperCase() + name.slice(1);
	};
	return (
		<Link to={`../${data.id}`}>
			<div className={classes['item-container']}>
				<div className={classes['pokemon-official-art']}>
					{data.sprites.other['official-artwork'].front_default ? (
						<Suspense fallback={<MoonLoader />}>
							<img src={data.sprites.other['official-artwork'].front_default} alt={`${data.name}-official-artwork`} />
						</Suspense>
					) : (
						<img src={fallback} />
					)}
				</div>
				<div className={classes['pokemon-id']}>
					N<span>&#7506;</span> {data.id}
				</div>
				<div className={classes['pokemon-name']}>{capitalize(data.name)}</div>
				<div className={classes['pokemon-type']}>
					<div className={`type-${data.types[0].type.name} ${classes['type']} ${classes['type-primary']} `}>
						{capitalize(data.types[0].type.name)}
					</div>
					<div
						className={`type-${data.types[1] ? data.types[1].type.name : 'none'} ${classes['type']} ${
							classes['type-secondary']
						} `}
					>
						{data.types[1] ? capitalize(data.types[1].type.name) : 'N/A'}
					</div>
				</div>
			</div>
		</Link>
	);
};
