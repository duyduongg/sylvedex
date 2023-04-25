import { useCallback } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setCurrentDetailId } from '../../../app/reducers/pokemon-detail-slice';
import { capitalize, format } from '../../../helpers/helpers';
import { Pokemon, PokemonType } from '../../../models';
import classes from './container-pokemon-list-item.module.scss';
import { PresentationalPokemonListItem } from './presentational-pokemon-list-item';
export interface ContainerPokemonListItemProps {
	data: Pokemon;
}

export const ContainerPokemonListItem = ({ data }: ContainerPokemonListItemProps) => {
	const dispatch = useAppDispatch();
	const handleItemClicked = (id: number) => {
		dispatch(setCurrentDetailId(id));
	};

	const capitalizeString = useCallback((str: string) => capitalize(str), [data]);

	const formatString = useCallback((str: string) => format(str), [data]);

	const formatTypesName = useCallback(
		(types: PokemonType[]) => {
			const formattedTypes: PokemonType[] = [];
			types.map((type: PokemonType) => {
				formattedTypes.push({ slot: type.slot, type: { url: type.type.url, name: capitalizeString(type.type.name) } });
			});
			return formattedTypes;
		},
		[data]
	);
	return (
		<PresentationalPokemonListItem
			id={data.id}
			name={formatString(capitalizeString(data.name))}
			types={formatTypesName(data.types)}
			spriteImage={data.sprites.other['official-artwork']?.front_default}
			onItemSelectHandler={handleItemClicked}
		/>
	);
};
