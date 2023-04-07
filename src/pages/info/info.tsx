import { ContainerPokemonDetail } from '../../components/pokemon-detail/container-pokemon-detail';
import { ContainerPokemonList } from '../../components/pokemon-list/container-pokemon-list';
import { Search } from '../../components/shared/search';
import classes from './info.module.scss';

export const PokemonInfo = () => {
	return (
		<div className={classes['info-page']}>
			<div className={classes['list-section']}>
				<Search />
				<ContainerPokemonList />
			</div>
			<div className={classes['detail-section']}>
				<ContainerPokemonDetail />
			</div>
		</div>
	);
};
