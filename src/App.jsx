import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Home from './components/Home';
import Auktion from './components/Auktion';
import Buy from './components/Buy';
import Sell from './components/Sell';
import Contact from './components/Contact';

function App() {
	return (
		<>
			<h1 className='text-3xl font-bold underline'>JENSENS Auktion</h1>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auktion' element={<Auktion />} />
				<Route path='/buy' element={<Buy />} />
				<Route path='/sell' element={<Sell />} />
				<Route path='/contact' element={<Contact />} />
			</Routes>

			<hr />
			<ul className='font-serif'>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='Auktion'>Auktion</NavLink>
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
			</ul>
		</>
	);
}

export default App;
