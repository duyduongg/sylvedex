import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingAbilities } from '../../app/reducers/ability-slice';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-detail-slice';
import { combineAbility, CombinedAbility } from '../../helpers/helpers';
import { AbilityResource } from '../../models';
import { Spinner } from '../fallback/spinner';
import classes from './container-pokemon-detail.module.scss';
import { PresentationalPokemonDetail } from './presentational-pokemon-detail';

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
			dispatch(requestGettingAbilities([...data.abilities.map((a: AbilityResource) => a.ability.name)]));
		}
	}, [data]);

	const [combinedAbilities, setCombinedAbilities] = useState<CombinedAbility[]>([]);
	useEffect(() => {
		if (data !== undefined && abilities.length !== 0) {
			setCombinedAbilities(combineAbility(data.abilities, abilities));
		}
	}, [abilities, data]);

	return (
		<div className={classes['detail-container']}>
			{data && !isLoading && abilities.length !== 0 && (
				<PresentationalPokemonDetail
					id={data.id}
					name={data.name}
					types={data.types}
					spriteImages={data.sprites.other['official-artwork']}
					combinedAbilities={combinedAbilities}
					height={data.height / 10}
					weight={data.weight / 10}
					baseExp={data.base_experience}
					stats={data.stats}
				/>
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
