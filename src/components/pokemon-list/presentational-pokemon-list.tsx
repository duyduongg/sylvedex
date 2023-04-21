import { Pokemon } from '../../models';
import { ContainerPokemonListItem } from './list-item/container-pokemon-list-item';
import classes from './presentational-pokemon-list.module.scss';
import React from 'react';
export interface PresentationalPokemonListProps {
	pokemons: Pokemon[];
}
export const PresentationalPokemonList = ({ pokemons }: PresentationalPokemonListProps) => {
	return (
		<div className={classes['list']}>
			{pokemons.map((pokemon) => (
				<ContainerPokemonListItem data={pokemon} key={pokemon.id} />
			))}
		</div>
	);
};
