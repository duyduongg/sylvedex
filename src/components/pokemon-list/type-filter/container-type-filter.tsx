import { useAppSelector } from '../../../app/hooks';
import { capitalize } from '../../../helpers';
import { NamedApiResource } from '../../../models';
import classes from './container-type-filter.module.scss';
import { PresentationalTypeFilter } from './presentational-type-filter';
export interface ContainerTypeFilterProps {
	hasTransitionIn: boolean;
	isFilter: boolean;
	selectedType?: string;
	selectTypeHandler: (name: string) => void;
	resetFilter: () => void;
}
export const ContainerTypeFilter = ({
	hasTransitionIn,
	isFilter,
	selectedType,
	selectTypeHandler,
	resetFilter
}: ContainerTypeFilterProps) => {
	const typesList = useAppSelector((state) => state.typesState.types);
	return (
		<div
			className={`${classes['filter-btns-container']} ${hasTransitionIn && classes['in']} ${
				isFilter && classes['visible']
			}`}
		>
			{typesList.map((type: NamedApiResource, idx: number) => (
				<PresentationalTypeFilter
					key={idx}
					typeName={type.name}
					formatTypeName={capitalize}
					selectedType={selectedType}
					selectTypeHandler={selectTypeHandler}
				/>
			))}
			<PresentationalTypeFilter typeName="all" formatTypeName={capitalize} selectTypeHandler={resetFilter} />
		</div>
	);
};
