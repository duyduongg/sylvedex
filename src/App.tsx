import { Route, Routes, useRoutes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header/header';
import { Detail } from './pages/detail';
import Home from './pages/home/home';
import { List } from './pages/list';
import { NotFound } from './pages/not-found';

function App() {
	return (
		<div className="App">
			<Header />
			<main>
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" index element={<Home />} />
					<Route path="pokemons" element={<List />}>
						<Route path=":id" element={<Detail />} />
					</Route>
				</Routes>
			</main>
		</div>
	);
}

export default App;
