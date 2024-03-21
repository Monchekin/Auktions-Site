import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Auktion from './components/Auktion';
import Buy from './components/Buy';
import Sell from './components/Sell';
import Contact from './components/Contact';

function App() {
	const [auctions, setAuctions] = useState(null);
	
	return (
		<>
			<h1 className='text-3xl font-bold underline'>Auktion</h1>
			<ul className='font-serif'>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='Buy'>Köp</NavLink>
				</li>
				<li>
					<NavLink to='Sell'>Sälja</NavLink>
				</li>
				<li>
					<NavLink to='Contact'>Kontakt</NavLink>
				</li>
				<li>{/* <NavLink to='Auktion'>Auktion</NavLink> */}</li>
			</ul>

			<Routes>
				<Route
					path='/'
					element={<Home auctions={auctions} setAuctions={setAuctions} />}
				/>
				{/* TODO: Hur skicka en auction istället för alla här. Användaren klickar på en auktion och då har jag id, titel, beskrivning etc. Kolla på react-router dynamic ID alternativt onClick */}

				<Route path='/auktion/:id' element={<Auktion auctions={auctions} />} />

				<Route path='/buy' element={<Buy />} />
				<Route path='/sell' element={<Sell />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>

			<hr />
		</>
	);
}

export default App;
