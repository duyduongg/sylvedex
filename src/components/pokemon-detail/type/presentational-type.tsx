import classes from './presentational-type.module.scss';
import React from 'react';
export interface TypeProps {
	typeName: string;
	typeClassStyle: string;
}
export const Type = ({ typeName, typeClassStyle }: TypeProps) => {
	return <div className={`${typeClassStyle} ${classes['type']}`}>{typeName}</div>;
};
