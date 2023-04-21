import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { requestGettingPokemonDetail } from '../../app/reducers/pokemon-detail-slice';
import { requestGettingTypeDetail } from '../../app/reducers/type-detail-slice';
import classes from './search.module.scss';
export const Search = () => {
	const [searchValue, setSearchValue] = useState('');
	const dispatch = useAppDispatch();
	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	const handleSearch = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (searchValue !== '') {
			dispatch(requestGettingPokemonDetail(searchValue));
		}
	};
	return (
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
	);
};
