import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import HomePage from './pages';
import SearchPage from './pages/search';
import DashboardLayout from './dashboard/layout';
import Artist from './pages/artist';
import Login from './pages/Login';
import { GlobalContext } from './context/GlobalState';

function App() {
	const { isLogin } = useContext(GlobalContext);
	useEffect(() => {
		isLogin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			{localStorage.getItem('token') ? (
				<DashboardLayout>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/artist/:id' element={<Artist />} />
						<Route path='/search' element={<SearchPage />} />
					</Routes>
				</DashboardLayout>
			) : (
				<Login />
			)}
		</Router>
	);
}

export default App;
