import { Route, Routes, useRoutes } from 'react-router-dom';
import './App.scss';
import { Detail } from './pages/detail';
import Home from './pages/home';
import { List } from './pages/list';
import { NotFound } from './pages/not-found';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" index element={<Home />} />
				<Route path="pokemons" element={<List />}>
					<Route path=":id" element={<Detail />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
