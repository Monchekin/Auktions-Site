import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Auktion from './components/Auktion';
import Sell from './components/Sell';

function App() {
	const [auctions, setAuctions] = useState(null);
	const [activeTab, setActiveTab] = useState('/');

	return (
		<>
			<h1
				className='text-3xl font-bold underline'
				style={{ marginBottom: '3%' }}>
				{' '}
				<u>Det bästa Auktionerna.se</u>
			</h1>

			<Nav variant='tabs' defaultActiveKey='/' style={{ marginLeft: '26%' }}>
				<Nav.Item style={{ color: 'black' }}>
					<Nav.Link
						as={NavLink}
						to='/'
						className='nav-link'
						style={{ color: 'black' }}>
						Alla Auktioner
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						as={NavLink}
						to='/sell'
						className='nav-link'
						style={{ color: 'black' }}>
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
