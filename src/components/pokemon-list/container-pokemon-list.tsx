import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemons } from '../../app/reducers/pokemon-slice';
import { Spinner } from '../fallback/spinner';
import { Paginator } from '../paginator/paginator';
import classes from './container-pokemon-list.module.scss';
import { PresentationalPokemonList } from './presentational-pokemon-list';

export const ContainerPokemonList = () => {
	const dispatch = useAppDispatch();
	const { list, isLoading, total, limit } = useAppSelector((state) => state.pokemonState);
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		dispatch(requestGettingPokemons(currentPage));
	}, [currentPage]);

	const handlePageChange = (pageNumber: number) => {
		if (pageNumber !== currentPage) {
			setCurrentPage(pageNumber);

			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<div className={classes['list-container']}>
			<div className={classes['api-src-issue-msg']}>
				* Due to inaccuracy of data provided by PokéApi, data of Sword and Shield (Generation 9), some pokémon
				information may be displayed not as expected
			</div>
			<Suspense fallback={<Spinner isDataLoading={isLoading} />}>
				<PresentationalPokemonList pokemons={list} />
			</Suspense>
			{list.length !== 0 && (
				<Paginator
					current={currentPage}
					total={total}
					pageSize={limit}
					onPageChange={(page) => handlePageChange(page)}
				/>
			)}
		</div>
	);
};
