import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ auctions, setAuctions }) => {
	const navigate = useNavigate();

	useEffect(() => {
		// Funktion för att hämta auktioner från servern
		const getAuctions = () => {
			fetch('https://auctioneer.azurewebsites.net/auction/j5t')
				.then((res) => res.json())
				.then((data) => setAuctions(data));
		};

		// Anropa funktionen för att hämta auktioner när komponenten monteras
		getAuctions();

	}, []); // Titta ALDRIG på en SETTER här, titta alltid på GETTERs

	// Funktion för att navigera till auktionssidan när en auktion klickas på
	const navigateToAuctionRoute = (auctionId, auctionInfo) => {
		navigate(`/auktion/${auctionId}`, { state: { auctionInfo } });
	};

	return (
		<div>
			<ul>
				{auctions &&
					auctions.map((auction) => (
						<li	key={auction.AuthorizeId} onClick={() => navigateToAuctionRoute(auction.AuctionID)}>
							<hr />
							<br />
							<p>ID i demo syfte: {auction.AuctionID}</p>
							<p>{auction.Title}</p>
							<p>{auction.StartingPrice}</p>
							<br />
						</li>
					))}
			</ul>
		</div>
	);
};

export default Home;
