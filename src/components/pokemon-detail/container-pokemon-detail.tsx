import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-detail-slice';
import { PresentationalPokemonDetail } from './presentational-pokemon-detail';
import classes from './container-pokemon-detail.module.scss';
import { Spinner } from '../fallback/spinner';
import { requestGettingAbilities } from '../../app/reducers/ability-slice';
import { combineAbility, CombinedAbilities } from '../../helpers/helpers';

export const ContainerPokemonDetail = () => {
	const { data, id } = useAppSelector((state) => {
		return { data: state.pokemonDetailState.data, id: state.pokemonDetailState.id };
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
		if (data !== undefined && abilities.length === 0) {
			setCombinedAbilities(combineAbility(data.abilities, abilities));
		}
	}, [abilities, data]);

	return (
		<div className={classes['detail-container']}>
			<Suspense fallback={<Spinner />}>
				{data && abilities.length !== 0 && (
					<PresentationalPokemonDetail data={data} combinedAbilities={combinedAbilities} />
				)}
			</Suspense>
		</div>
	);
};
