import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ auctions, setAuctions }) => {
	const navigate = useNavigate();

	useEffect(() => {
		// Funktion för att hämta auktioner från servern
		const getAuctions = () => {
			fetch('https://auctioneer.azurewebsites.net/auction/j5t')
				.then((res) => {
					if (!res.ok) {
						throw new Error('Network response was not ok');
					}
					return res.json();
				})
				.then((data) => {
					console.log(data);
					setAuctions(data);
				})
				.catch((error) => console.error('Error fetching auctions:', error)); // Konsollogga eventuella fel utan att försöka komma åt data
		};

		// Anropa funktionen för att hämta auktioner när komponenten monteras
		getAuctions();
	}, []);

	// Funktion för att navigera till auktionssidan när en auktion klickas på
	const navigateToAuctionRoute = (auction) => {
		navigate(`/auktion/${auction.AuctionID}`, { state: { auction: auction } });
	};

	return (
		<div>
			<ul>
				{auctions ? (
					auctions.map((auction) => (
						<li
							key={auction.AuctionID}
							onClick={() => navigateToAuctionRoute(auction)}>
							<hr />
							<br />
							<p>'ID i demo syfte:'' {auction.AuctionID}</p>
							<p>{auction.Title}</p>
							<p>{auction.StartingPrice}</p>
							<br />
						</li>
					))
				) : (
					<p>Laddar...</p>
				)}
			</ul>
		</div>
	);
};

export default Home;
