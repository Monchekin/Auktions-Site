import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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
		navigate(`/auktion/${auction.AuctionID}`, {
			state: {
				auction: auction,
				startDate: new Date(auction.startDate),
				endDate: new Date(auction.endDate)
			}
		});
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('sv-SE');
	};

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				gap: '1rem',
				marginTop: '2vw'
			}}>
			{auctions ? (
				auctions.map((auction) => (
					<Card
						key={auction.AuctionID}
						onClick={() => navigateToAuctionRoute(auction)}
						style={{
							cursor: 'pointer',
							display: 'flex',
							flexDirection: 'row',
							backgroundColor: 'lightgray'
						}}>
						<Card.Body>
							<Card.Title>
								<p>
									<b>
										<u>{auction.Title}</u>
									</b>
								</p>
							</Card.Title>
							<Card.Text>
								<h1>{auction.Titel}</h1>
								<p>
									<b>Startpris: </b>
									{auction.StartingPrice} kr
								</p>
								<p>
									<b>Slutdatum: </b>
									{formatDate(auction.EndDate)}
								</p>
							</Card.Text>
						</Card.Body>
					</Card>
				))
			) : (
				<h1 style={{ textAlign: 'center' }}>Laddar...</h1>
			)}
		</div>
	);
};

export default Home;
