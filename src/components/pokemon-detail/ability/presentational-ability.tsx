import { CombinedAbility } from '../../../helpers/helpers';
import classes from './presentational-ability.module.scss';
export interface PresentationalAbilityProps {
	ability: CombinedAbility;
}

export const PresentationalAbility = ({ ability }: PresentationalAbilityProps) => {
	return (
		<div className={classes['ability']} key={ability.name}>
			<span className={classes['ability-description']}>{ability.description}</span>
			{ability.name}
		</div>
	);
};
