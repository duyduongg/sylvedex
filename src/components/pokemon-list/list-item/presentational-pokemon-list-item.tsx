import { PokemonType } from '../../../models';
import classes from './presentational-pokemon-list-item.module.scss';
import fallback from '../../../assets/fallback.svg';
export interface PresentationalPokemonListItemProps {
	id: number;
	spriteImage?: string;
	name: string;
	types: PokemonType[];
	onItemSelectHandler: (x: number) => void;
}

export const PresentationalPokemonListItem = ({
	id,
	spriteImage,
	name,
	types,
	onItemSelectHandler
}: PresentationalPokemonListItemProps) => {
	return (
		<button className={classes['item-container']} onClick={() => onItemSelectHandler(id)}>
			{spriteImage ? (
				<div className={classes['pokemon-official-art']}>
					<img src={spriteImage} alt={`${name}-official-artwork`} />
				</div>
			) : (
				<div className={classes['fallback-img']}>
					<img src={fallback} />
				</div>
			)}

			<div className={classes['pokemon-id']}>
				N<span>&#7506;</span> {id}
			</div>
			<div className={classes['pokemon-name']}>{name}</div>
			<div className={classes['pokemon-type']}>
				{types.map((type, idx) => (
					<div className={`type-${type.type.name.toLowerCase()} ${classes['type']}`} key={idx}>
						{type.type.name}
					</div>
				))}
			</div>
		</button>
	);
};
