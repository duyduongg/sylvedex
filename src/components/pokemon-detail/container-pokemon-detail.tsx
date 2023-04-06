import { Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-slice';
import { PresentationalPokemonDetail } from './presentational-pokemon-detail';
import classes from './container-pokemon-detail.module.scss';
import { Spinner } from '../fallback/spinner';
import { requestGettingAbilities } from '../../app/reducers/ability-slice';
export const ContainerPokemonDetail = () => {
	const { data, id } = useAppSelector((state) => {
		return { data: state.pokemonState.detail.data, id: state.pokemonState.detail.id };
	});
	const { abilities } = useAppSelector((state) => {
		return { abilities: state.abilityState.data };
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(requestGettingPokemonDetail(id.toString()));
	}, [id]);

	useEffect(() => {
		dispatch(requestGettingAbilities([...data.abilities.map((a) => a.ability.name)]));
	}, [data]);
	return (
		<div className={classes['detail-container']}>
			<Suspense fallback={<Spinner />}>
				{data && abilities && <PresentationalPokemonDetail data={data} abilities={abilities} />}
			</Suspense>
		</div>
	);
};
