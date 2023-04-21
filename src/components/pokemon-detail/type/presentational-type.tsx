import classes from './presentational-type.module.scss';
export interface TypeProps {
	typeName: string;
	typeClassStyle: string;
}
export const Type = ({ typeName, typeClassStyle }: TypeProps) => {
	return <div className={`${typeClassStyle} ${classes['type']}`}>{typeName}</div>;
};
