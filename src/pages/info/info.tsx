import { lazy, Suspense } from 'react';
import { Spinner } from '../../components/fallback/spinner';
import { Search } from '../../components/shared/search';
import classes from './info.module.scss';

const ContainerPokemonList = lazy(() => import('../../components/pokemon-list/container-pokemon-list'));
const ContainerPokemonDetail = lazy(() => import('../../components/pokemon-detail/container-pokemon-detail'));
const PokemonInfo = () => {
	return (
		<div className={classes['info-page']}>
			<div className={classes['list-section']}>
				<Search />
				<div className={classes['api-src-issue-msg']}>
					* Due to inaccuracy of data provided by PokéApi, some pokémons' information of Sword and Shield (Generation 9)
					may be displayed not as expected.
				</div>
				<Suspense fallback={<Spinner />}>
					<ContainerPokemonList />
				</Suspense>
			</div>
			<div className={classes['detail-section']}>
				<Suspense fallback={<Spinner />}>
					<ContainerPokemonDetail />
				</Suspense>
			</div>
		</div>
	);
};

export default PokemonInfo;
