import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Auktion from './components/Auktion';
import Sell from './components/Sell';
import Contact from './components/Contact';

function App() {
	const [auctions, setAuctions] = useState(null);

	return (
		<>
			<h1 className='text-3xl font-bold underline'> Auktion</h1>

			<ul className='font-serif'>
				<li>
					<NavLink to='/'>All Auktion</NavLink>
				</li>
				<li>
					<NavLink to='Sell'>New Auction</NavLink>
				</li>
				<li>
					<NavLink to='Contact'>Contact</NavLink>
				</li>
			</ul>

			<Routes>
				<Route
					path='/'
					element={<Home auctions={auctions} setAuctions={setAuctions} />}
				/>
				<Route path='/auktion/:id' element={<Auktion auctions={auctions} />} />
				<Route path='/sell' element={<Sell />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>

		</>
	);
}

export default App;
