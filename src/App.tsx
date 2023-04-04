import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { PokemonInfo } from './pages/info/info';
import { NotFound } from './pages/not-found';

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" index element={<Home />} />
					<Route path="pokemons" element={<PokemonInfo />}></Route>
				</Routes>
			</main>
		</div>
	);
}

export default App;
