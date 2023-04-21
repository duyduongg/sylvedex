import { CombinedAbility } from '../../../helpers/helpers';
import classes from './container-abilities.module.scss';
import { PresentationalAbility } from './presentational-ability';
export interface ContainerAbilitiesProps {
	abilities: CombinedAbility[];
}
export const ContainerAbilities = ({ abilities }: ContainerAbilitiesProps) => {
	return (
		<div className={classes['ability-container']}>
			{abilities.map((ability, idx) => (
				<PresentationalAbility ability={ability} key={idx} />
			))}
		</div>
	);
};
