import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NestedRelatedPokemon } from '../../../app/reducers/pokemon-detail-slice';
import classes from './presentational-evolution-chain.module.scss';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
export interface PresentationalEvolutionChainProps {
	chain: NestedRelatedPokemon[];
	formatString: (str: string) => string;
	onIdChangeHandler: (offset: number, isForward?: boolean) => void;
}

export const PresentationalEvolutionChain = ({
	chain,
	formatString,
	onIdChangeHandler
}: PresentationalEvolutionChainProps) => {
	return (
		<div
			className={`${classes['evolution-container']} ${chain.length >= 3 ? `${classes['evolution-grid']}` : 'flex-col'}`}
		>
			{chain.map((link) => {
				return (
					<div
						key={link.pokemon.id}
						className={`${classes['evolution-link']} ${link.related.length >= 3 ? 'flex-col' : 'flex-row'}`}
					>
						<button className={classes['link-info']} onClick={() => onIdChangeHandler(link.pokemon.id)}>
							<img
								src={link.pokemon.sprites.other['official-artwork'].front_default}
								alt={`${link.pokemon.name}-evolution-artwork`}
								className={classes['evolution-artwork']}
							/>
							<span>{formatString(link.pokemon.name)}</span>
						</button>
						{link.related.length > 0 &&
							(link.related.length > 3 ? (
								<FontAwesomeIcon icon={faArrowDown} size="lg" className={classes['icon']} />
							) : (
								<FontAwesomeIcon icon={faArrowRight} size="lg" className={classes['icon']} />
							))}
						{link.related.length > 0 && (
							<PresentationalEvolutionChain
								chain={link.related}
								formatString={formatString}
								onIdChangeHandler={onIdChangeHandler}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};
