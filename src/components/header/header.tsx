import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import classes from './header.module.scss';
import logo from '../../assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { requestGettingRegions } from '../../app/reducers/region-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const region = useAppSelector((state) => state.regionState.results);
	useEffect(() => {
		dispatch(requestGettingRegions());
	}, []);
	return (
		<header className={`${location.pathname === '/' ? `${classes['main']}` : ''}`}>
			<div className={classes['content']}>
				<div className={classes['logo']}>
					<Link to="/">
						<img src={logo} />
					</Link>
				</div>
				<div className={classes['nav-links']}>
					<NavLink to="/" className={({ isActive, isPending }) => (isPending ? `pending` : isActive ? 'active' : '')}>
						Home
					</NavLink>
					<NavLink
						to="/"
						className={({ isActive, isPending }) =>
							isPending ? `${classes['menu']} pending` : isActive ? `${classes['menu']} active` : `${classes['menu']}`
						}
					>
						<span>List Pokémons</span>
						<span className={classes['dropdown-icon']}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
								<path
									fillRule="evenodd"
									d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
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
