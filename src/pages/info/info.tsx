import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-slice';
import { ContainerPokemonDetail } from '../../components/pokemon-detail/container-pokemon-detail';
import { ContainerPokemonList } from '../../components/pokemon-list/container-pokemon-list';
import classes from './info.module.scss';

export const PokemonInfo = () => {
	const [searchValue, setSearchValue] = useState('');
	const dispatch = useAppDispatch();
	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(requestGettingPokemonDetail(searchValue));
	};
	return (
		<div className={classes['info-page']}>
			<div className={classes['list-section']}>
				<div className={classes['search-bar']}>
					<form className={classes['search-form']} onSubmit={handleSearch}>
						<label htmlFor="searchPkmInput" style={{ backgroundColor: 'transparent' }} />
						<input
							id="searchPkmInput"
							className={classes['search-input']}
							type="text"
							placeholder="Search by name or ID"
							onChange={handleValueChange}
						/>
						<button type="submit" className={classes['search-btn']}>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</button>
					</form>
				</div>
				<ContainerPokemonList />
			</div>
			<div className={classes['detail-section']}>
				<ContainerPokemonDetail />
			</div>
		</div>
	);
};
