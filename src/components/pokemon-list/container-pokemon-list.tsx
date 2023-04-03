import { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemons } from '../../app/reducers/pokemon-slice';
import { Spinner } from '../fallback/spinner';
import classes from './container-pokemon-list.module.scss';
import { PresentationalPokemonList } from './presentational-pokemon-list';

export const ContainerPokemonList = () => {
	const dispatch = useAppDispatch();
	const { list, isLoading } = useAppSelector((state) => state.pokemonState);

	useEffect(() => {
		if (list) dispatch(requestGettingPokemons());
	}, []);
	return (
		<div className={classes['list-container']}>
			<Suspense fallback={<Spinner isDataLoading={true} />}>
				<PresentationalPokemonList pokemons={list} />
			</Suspense>
		</div>
	);
};
