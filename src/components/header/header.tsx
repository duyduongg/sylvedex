import { faFacebookSquare, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import logo from '../../assets/logo.png';
import classes from './header.module.scss';
import React from 'react';
export const Header = () => {
	const location = useLocation();
	return (
		<header className={`${location.pathname === '/' ? `${classes['main']}` : ''}`}>
			<div className={classes['content']}>
				<div className={classes['logo']}>
					<Link to="/">
						<img src={logo} />
					</Link>
				</div>
				<div className={classes['nav-links']}>
					<NavLink to="/" className={({ isActive }) => (isActive ? `${classes['active']}` : '')}>
						Home
					</NavLink>
					<NavLink
						to="/pokemons"
						className={({ isActive, isPending }) =>
							isPending
								? `${classes['menu']} pending`
								: isActive
								? `${classes['menu']} ${classes['active']}`
								: `${classes['menu']}`
						}
					>
						<span>List Pokémons</span>
					</NavLink>
				</div>
				<div className={classes['social-links']}>
					<div className={classes['social-link']}>
						<Link to="https://www.facebook.com/duy.man.0602">
							<FontAwesomeIcon icon={faFacebookSquare} />
						</Link>
					</div>
					<div className={classes['social-link']}>
						<Link to="https://github.com/duyduongg">
							<FontAwesomeIcon icon={faGithub} />
						</Link>
					</div>
					<div className={classes['social-link']}>
						<Link to="https://www.linkedin.com/in/duy-duong-a16019211/">
							<FontAwesomeIcon icon={faLinkedin} />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};
