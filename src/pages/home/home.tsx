import { Link } from 'react-router-dom';
import mascot from '../../assets/mascot.png';
import classes from './home.module.scss';
export const Home = () => {
	return (
		<div className={classes['home']}>
			<div className={classes['background-overlay']}>{/* <img src={background} /> */}</div>
			<div className={classes['landing-page']}>
				<div className={classes['intro-texts']}>
					<h1 className={classes['intro']}>A simple self-made pokémons index</h1>
					<p className={classes['description']}>
						Display information about Pokémons name, images, types as well as their original generations
					</p>
					<div className={classes['copyright']}>
						<div>API are © by Paul Hallet 2013 - 2021 and PokéAPI contributors</div>
						<div>Pokémon and All respective names are trademarks & © by Nintendo 1996 - 2023</div>
					</div>

					<div className={classes['action-btns']}>
						<div className={classes['proceed']}>
							<Link to="/pokemons" className={classes['action-btn']}>
								<span>Try now</span>
								<span className={classes['icon']}>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
										<path
											fillRule="evenodd"
											d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
											clipRule="evenodd"
										/>
									</svg>
								</span>
							</Link>
						</div>
					</div>
				</div>
				<div className={classes['intro-img']}>
					<img src={mascot} className={classes['mascot']} />
				</div>
			</div>
		</div>
	);
};
