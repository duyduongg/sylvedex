import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ContainerPokemonList } from '../../../components/pokemon-list/container-pokemon-list';
import classes from './list.module.scss';

export const List = () => {
	return (
		<div className={classes['list-section']}>
			<ContainerPokemonList />
		</div>
	);
};
