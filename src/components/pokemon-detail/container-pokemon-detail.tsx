import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-detail-slice';
import { PresentationalPokemonDetail } from './presentational-pokemon-detail';
import classes from './container-pokemon-detail.module.scss';
import { Spinner } from '../fallback/spinner';
import { requestGettingAbilities } from '../../app/reducers/ability-slice';
import { combineAbility, CombinedAbilities } from '../../helpers/helpers';

const ContainerPokemonDetail = () => {
	const { data, id, isLoading } = useAppSelector((state) => {
		return {
			data: state.pokemonDetailState.pokemonData,
			id: state.pokemonDetailState.id,
			isLoading: state.pokemonDetailState.isLoading
		};
	});
	const { abilities } = useAppSelector((state) => {
		return { abilities: state.abilityState.data };
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(requestGettingPokemonDetail(id.toString()));
	}, [id]);

	useEffect(() => {
		if (data !== undefined) {
			dispatch(requestGettingAbilities([...data.abilities.map((a) => a.ability.name)]));
		}
	}, [data]);

	const [combinedAbilities, setCombinedAbilities] = useState<CombinedAbilities[]>([]);
	useEffect(() => {
		if (data !== undefined && abilities.length !== 0) {
			setCombinedAbilities(combineAbility(data.abilities, abilities));
		}
	}, [abilities, data]);

	return (
		<div className={classes['detail-container']}>
			{data && !isLoading && abilities.length !== 0 && (
				<PresentationalPokemonDetail data={data} combinedAbilities={combinedAbilities} />
			)}
			{(!data || isLoading) && (
				<div className={classes['fallback']}>
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default ContainerPokemonDetail;
