import { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-slice';
import { PresentationalPokemonDetail } from './presentational-pokemon-detail';
import classes from './container-pokemon-detail.module.scss';
import { Spinner } from '../fallback/spinner';
export const ContainerPokemonDetail = () => {
	const { data, id } = useAppSelector((state) => {
		return { data: state.pokemonState.detail.data, id: state.pokemonState.detail.id };
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(requestGettingPokemonDetail(id.toString()));
	}, [id]);
	return (
		<div className={classes['detail-container']}>
			<Suspense fallback={<Spinner />}>{data && <PresentationalPokemonDetail data={data} />}</Suspense>
		</div>
	);
};
