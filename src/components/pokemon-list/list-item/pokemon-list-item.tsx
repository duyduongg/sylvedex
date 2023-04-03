import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { Pokemon } from '../../../models/pokemon';
import classes from './pokemon-list-item.module.scss';
export interface PokemonListItemProps {
	data: Pokemon;
}
export const PokemonListItem = ({ data }: PokemonListItemProps) => {
	const capitalizeName = (name: string) => {
		return name.at(0)?.toUpperCase() + name.slice(1);
	};
	return (
		<Link to={`../${data.id}`}>
			<div className={classes['item-container']}>
				<div className={classes['pokemon-official-art']}>
					<Suspense fallback={<MoonLoader />}>
						<img src={data.sprites.other['official-artwork'].front_default} alt={`${data.name}-official-artwork`} />
					</Suspense>
				</div>
				<div className={classes['pokemon-name']}>{capitalizeName(data.name)}</div>
				<div className={classes['pokemon-type']}>
					<div className={`type-${data.types[0].type.name} ${classes['type']} ${classes['type-primary']} `}>
						{data.types[0].type.name.toUpperCase()}
					</div>
					<div
						className={`type-${data.types[1] ? data.types[1].type.name : 'none'} ${classes['type']} ${
							classes['type-secondary']
						} `}
					>
						{data.types[1] ? data.types[1].type.name.toLocaleUpperCase() : 'N/A'}
					</div>
				</div>
			</div>
		</Link>
	);
};
