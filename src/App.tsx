import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Spinner } from './components/fallback/spinner';
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
// import { PokemonInfo } from './pages/info/info';
import { NotFound } from './pages/not-found';
const PokemonInfo = lazy(() => import('./pages/info/info'));

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" index element={<Home />} />
					<Route
						path="pokemons"
						element={
							<Suspense
								fallback={
									<div style={{ position: 'absolute', top: '50%', left: '50%' }}>
										<Spinner />
									</div>
								}
							>
								<PokemonInfo />
							</Suspense>
						}
					></Route>
				</Routes>
			</main>
		</div>
	);
}

export default App;
