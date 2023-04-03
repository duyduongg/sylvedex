import { Pokemon } from '../../models/pokemon';
import { PokemonListItem } from './list-item/pokemon-list-item';
import classes from './presentational-pokemon-list.module.scss';

export interface PresentationalPokemonListProps {
	pokemons: Pokemon[];
}
export const PresentationalPokemonList = ({ pokemons }: PresentationalPokemonListProps) => {
	return (
		<div className={classes['list']}>
			{pokemons.map((pokemon) => (
				<PokemonListItem data={pokemon} key={pokemon.id} />
			))}
		</div>
	);
};
