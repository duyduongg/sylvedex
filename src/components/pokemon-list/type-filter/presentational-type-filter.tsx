import classes from './presentational-type-filter.module.scss';
export interface PresentationalTypeFilterProps {
	typeName: string;
	selectedType?: string;
	selectTypeHandler: (name: string) => void;
	formatTypeName: (name: string) => string;
}
export const PresentationalTypeFilter = ({
	typeName,
	selectedType,
	selectTypeHandler,
	formatTypeName
}: PresentationalTypeFilterProps) => {
	return (
		<button
			onClick={() => selectTypeHandler(typeName)}
			className={`type-${typeName} ${classes['filter-type-btn']} ${
				selectedType === typeName ? classes['selected'] : ''
			} ${typeName === 'all' ? classes['reset'] : ''}`}
		>
			{formatTypeName(typeName)}
		</button>
	);
};
