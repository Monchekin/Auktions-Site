import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Auktion from './components/Auktion';
import Sell from './components/Sell';

function App() {
	const [auctions, setAuctions] = useState(null);

	return (
		<>
			<h1
				className='text-3xl font-bold underline'
				style={{ marginBottom: '5%' }}>
				{' '}
				<u>Auktion.se</u>
			</h1>

			<Nav variant='tabs' defaultActiveKey='/' style={{ marginLeft: '25%' }}>
				<Nav.Item>
					<Nav.Link as={NavLink} to='/' activeClassName='active' exact>
						Alla Auktioner
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={NavLink} to='/sell' activeClassName='active'>
						Lägg till ny Auktion
					</Nav.Link>
				</Nav.Item>
			</Nav>

			<Routes>
				<Route
					path='/'
					element={<Home auctions={auctions} setAuctions={setAuctions} />}
				/>
				<Route path='/auktion/:id' element={<Auktion auctions={auctions} />} />
				<Route path='/sell' element={<Sell />} />
			</Routes>
		</>
	);
}

export default App;
