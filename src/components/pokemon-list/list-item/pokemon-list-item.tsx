import { Suspense, useCallback } from 'react';
import { MoonLoader } from 'react-spinners';
import { useAppDispatch } from '../../../app/hooks';
import { setCurrentDetailId } from '../../../app/reducers/pokemon-detail-slice';
import fallback from '../../../assets/fallback.svg';
import { capitalize, format } from '../../../helpers/helpers';
import { Pokemon } from '../../../models';
import classes from './pokemon-list-item.module.scss';
export interface PokemonListItemProps {
	data: Pokemon;
}

export const PokemonListItem = ({ data }: PokemonListItemProps) => {
	const dispatch = useAppDispatch();
	const handleItemClicked = (id: number) => {
		dispatch(setCurrentDetailId(id));
	};

	const capitalizeString = useCallback((str: string) => capitalize(str), [data]);

	const formatString = useCallback((str: string) => format(str), [data]);
	return (
		<div className={classes['item-mask']}>
			<button className={classes['item-container']} onClick={() => handleItemClicked(data.id)}>
				{data.sprites.other['official-artwork'].front_default ? (
					<div className={classes['pokemon-official-art']}>
						<Suspense fallback={<MoonLoader />}>
							<img src={data.sprites.other['official-artwork'].front_default} alt={`${data.name}-official-artwork`} />
						</Suspense>
					</div>
				) : (
					<div className={classes['fallback-img']}>
						<img src={fallback} />
					</div>
				)}

				<div className={classes['pokemon-id']}>
					N<span>&#7506;</span> {data.id}
				</div>
				<div className={classes['pokemon-name']}>{formatString(capitalizeString(data.name))}</div>
				<div className={classes['pokemon-type']}>
					<div className={`type-${data.types[0].type.name} ${classes['type']}`}>
						{capitalizeString(data.types[0].type.name)}
					</div>
					{data.types[1] && (
						<div className={`type-${data.types[1].type.name} ${classes['type']}  `}>
							{capitalizeString(data.types[1].type.name)}
						</div>
					)}
				</div>
			</button>
		</div>
	);
};
