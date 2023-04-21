import { PokemonType } from '../../../models';
import { Type } from './presentational-type';
import classes from './container-types.module.scss';
export interface TypesContainerProps {
	types: PokemonType[];
	format: (str: string) => string;
}

export const TypesContainer = ({ types, format }: TypesContainerProps) => {
	return (
		<div className={classes['pokemon-type']}>
			<Type typeName={format(types[0].type.name)} typeClassStyle={`type-${types[0].type.name}`} />
			{types[1] && <Type typeName={format(types[1].type.name)} typeClassStyle={`type-${types[1].type.name}`} />}
		</div>
	);
};
