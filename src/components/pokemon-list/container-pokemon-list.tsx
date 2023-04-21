import { Suspense, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemons, requestGettingPokemonsFromArray } from '../../app/reducers/pokemon-slice';
import { clearTypePokemon, requestGettingTypeDetail } from '../../app/reducers/type-detail-slice';
import { requestGettingTypes } from '../../app/reducers/type-slice';
import { capitalize } from '../../helpers/helpers';
import { Spinner } from '../fallback/spinner';
import { Paginator } from '../paginator/paginator';
import classes from './container-pokemon-list.module.scss';
import { PresentationalPokemonList } from './presentational-pokemon-list';

const ContainerPokemonList = () => {
	const dispatch = useAppDispatch();

	const { list, total, limit } = useAppSelector((state) => state.pokemonState);
	const typesList = useAppSelector((state) => state.typesState.types);
	const type = useAppSelector((state) => state.typeDetailState.typeData);

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
	const [isFilter, setIsFilter] = useState(false);

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
			dispatch(requestGettingTypeDetail(selectedType!));
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
				{isFilter && (
					<div className={classes['filter-btns-container']}>
						{typesList.map((type, idx) => (
							<button
								onClick={() => handleSelectType(type.name)}
								key={idx}
								className={`type-${type.name} ${classes['filter-type-btn']} ${
									selectedType === type.name ? classes['selected'] : ''
								}`}
							>
								{capitalize(type.name)}
							</button>
						))}
						<button
							onClick={reset}
							className={`${classes['filter-type-btn']} ${classes['reset']} ${
								selectedType === undefined ? classes['selected'] : ''
							}`}
						>
							All
						</button>
					</div>
				)}
			</div>

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
