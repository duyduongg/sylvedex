import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemons, requestGettingPokemonsFromArray } from '../../app/reducers/pokemon-slice';
import { clearTypePokemon } from '../../app/reducers/type-slice';
import { Spinner } from '../fallback/spinner';
import { Paginator } from '../paginator/paginator';
import classes from './container-pokemon-list.module.scss';
import { PresentationalPokemonList } from './presentational-pokemon-list';

const ContainerPokemonList = () => {
	const dispatch = useAppDispatch();
	const { list, total, limit } = useAppSelector((state) => state.pokemonState);
	const type = useAppSelector((state) => state.typeDetailState.data);
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		if (type !== undefined) {
			dispatch(requestGettingPokemonsFromArray(currentPage));
		} else {
			dispatch(requestGettingPokemons(currentPage));
		}
	}, [currentPage, type]);

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
