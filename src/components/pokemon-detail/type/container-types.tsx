import { PokemonType } from '../../../models';
import classes from './container-types.module.scss';
import { Type } from './presentational-type';
export interface ContainerTypesProps {
	types: PokemonType[];
	format: (str: string) => string;
}

export const ContainerTypes = ({ types, format }: ContainerTypesProps) => {
	return (
		<div className={classes['pokemon-type']}>
			<Type typeName={format(types[0].type.name)} typeClassStyle={`type-${types[0].type.name}`} />
			{types[1] && <Type typeName={format(types[1].type.name)} typeClassStyle={`type-${types[1].type.name}`} />}
		</div>
	);
};
