import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemons } from '../../app/reducers/pokemon-slice';
import { Spinner } from '../fallback/spinner';
import { Paginator } from '../paginator/paginator';
import classes from './container-pokemon-list.module.scss';
import { PresentationalPokemonList } from './presentational-pokemon-list';

const ContainerPokemonList = () => {
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
			<Suspense fallback={<Spinner />}>{<PresentationalPokemonList pokemons={list} />}</Suspense>
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

export default ContainerPokemonList;
