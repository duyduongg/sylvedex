import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { requestGettingAbilities } from '../../app/reducers/ability-slice';
import { requestGettingPokemonDetail, setCurrentDetailId } from '../../app/reducers/pokemon-detail-slice';
import { POKEMON_ID_LIMIT } from '../../constants';
import { capitalize, combineAbility, CombinedAbility, format } from '../../helpers';
import { AbilityResource } from '../../models';
import { Spinner } from '../fallback/spinner';
import classes from './container-pokemon-detail.module.scss';
import { PresentationalPokemonDetail } from './presentational-pokemon-detail';

const ContainerPokemonDetail = () => {
	const { data, id, isLoading, nestedRelatedPokemons } = useAppSelector((state) => {
		return {
			data: state.pokemonDetailState.pokemonData,
			id: state.pokemonDetailState.id,
			isLoading: state.pokemonDetailState.isLoading,
			nestedRelatedPokemons: state.pokemonDetailState.nestedRelatedPokemons
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

	const handleChangeViewDataId = (n: number, isForward?: boolean) => {
		const nextId = isForward === undefined ? n : isForward ? id + n : id - n;

		if (nextId <= POKEMON_ID_LIMIT) {
			dispatch(setCurrentDetailId(nextId));
		}

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const formatString = useCallback(
		(str: string) => {
			return format(str);
		},
		[name]
	);

	const capitalizeString = useCallback(
		(str: string) => {
			return capitalize(str);
		},
		[name]
	);

	return (
		<div className={classes['detail-container']}>
			{data && !isLoading && abilities.length !== 0 && (
				<PresentationalPokemonDetail
					id={data.id}
					name={formatString(capitalizeString(data.name))}
					types={data.types}
					spriteImages={data.sprites.other['official-artwork']}
					combinedAbilities={combinedAbilities}
					height={data.height / 10}
					weight={data.weight / 10}
					baseExp={data.base_experience}
					stats={data.stats}
					evolutionChain={nestedRelatedPokemons}
					onIdChangeHandler={handleChangeViewDataId}
					formatString={capitalizeString}
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
