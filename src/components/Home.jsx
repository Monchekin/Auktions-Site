import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ auctions, setAuctions }) => {
	const navigate = useNavigate();

	// Hämta auktioner från servern när komponenten monteras
	useEffect(() => {
		const getAuctions = () => {
			fetch('https://auctioneer.azurewebsites.net/auction/j5t')
				.then((res) => {
					if (!res.ok) {
						throw new Error('Network response was not ok');
					}
					return res.json();
				})
				.then((data) => {
					setAuctions(data);
				})
				.catch((error) => console.error('Error fetching auctions:', error));
		};

		getAuctions();
	}, []);

	// Funktion för att navigera till auktionssidan när en auktion klickas på
	const navigateToAuctionRoute = (auction) => {
		navigate(`/auktion/${auction.AuctionID}`, { state: { auction: auction } });
	};

	// const formatDate = (dateString) => {
	// 	const date = new Date(dateString);
	// 	return date.toLocaleDateString('sv-SE');
	// };

	return (
		<div>
			<ul>
				{/* Kolla om auktioner finns tillgängliga */}
				{auctions ? (
					// Om auktioner finns, mappa genom varje auktion och skapa en listpunkt
					auctions.map((auction) => (
						<li
							key={auction.AuctionID}
							onClick={() => navigateToAuctionRoute(auction)}>
							<hr />
							<br />
							<p>
								<b>
									<u>{auction.Title}</u>
								</b>
							</p>
							<p>
								<b>Starting Price: </b>
								{auction.StartingPrice} kr
							</p>
							<p>
								<b>End date: </b>
								{auction.EndDate}
							</p>
							<br />
						</li>
					))
				) : (
					// Om inga auktioner finns, visa ett laddningsmeddelande
					<p>Laddar...</p>
				)}
			</ul>
		</div>
	);
};

export default Home;
