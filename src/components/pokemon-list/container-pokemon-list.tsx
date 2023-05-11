import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemons, requestGettingPokemonsFromArray } from '../../app/reducers/pokemon-slice';
import { clearTypePokemon, requestGettingTypeDetail } from '../../app/reducers/type-detail-slice';
import { requestGettingTypes } from '../../app/reducers/type-slice';
import { useOnMountTransition, useSiblingCount } from '../../hooks';
import { Spinner } from '../fallback/spinner';
import { Paginator } from '../paginator/paginator';
import classes from './container-pokemon-list.module.scss';
import { PresentationalPokemonList } from './presentational-pokemon-list';
import { ContainerTypeFilter } from './type-filter/container-type-filter';
const ContainerPokemonList = () => {
	const dispatch = useAppDispatch();

	const { list, total, limit } = useAppSelector((state) => state.pokemonsState);

	const type = useAppSelector((state) => state.typeDetailState.typeData);

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
	const [isFilter, setIsFilter] = useState(false);
	const hasTransitionIn = useOnMountTransition(isFilter, 500);
	const siblingCount = useSiblingCount(4);

	useEffect(() => {
		dispatch(requestGettingTypes());
	}, []);

	useEffect(() => {
		if (type !== undefined) {
			dispatch(requestGettingPokemonsFromArray(currentPage));
		} else {
			dispatch(requestGettingPokemons(currentPage));
		}
	}, [currentPage, type]);

	useEffect(() => {
		if (selectedType !== undefined) {
			dispatch(requestGettingTypeDetail(selectedType));
		} else {
			dispatch(clearTypePokemon());
		}
	}, [selectedType]);

	const handlePageChange = (pageNumber: number) => {
		if (pageNumber !== currentPage) {
			setCurrentPage(pageNumber);

			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const reset = () => {
		setSelectedType(undefined);
		setCurrentPage(1);
	};

	const handleSelectType = (typeName: string) => {
		setSelectedType(typeName);
	};

	return (
		<div className={classes['list-container']}>
			<div className={classes['type-filter-section']}>
				<button className={classes['open-filter-container-btn']} onClick={() => setIsFilter((isFilter) => !isFilter)}>
					Filter by type +
				</button>
				{(hasTransitionIn || isFilter) && (
					<ContainerTypeFilter
						hasTransitionIn={hasTransitionIn}
						isFilter={isFilter}
						resetFilter={reset}
						selectTypeHandler={handleSelectType}
						selectedType={selectedType}
					/>
				)}
			</div>

			<Suspense fallback={<Spinner />}>{<PresentationalPokemonList pokemons={list} />}</Suspense>
			{list.length !== 0 && (
				<Paginator
					current={currentPage}
					total={total}
					pageSize={limit}
					onPageChange={(page) => handlePageChange(page)}
					siblingCount={siblingCount}
				/>
			)}
		</div>
	);
};

export default ContainerPokemonList;
