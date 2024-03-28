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
				display: 'flex',
				flexWrap: 'wrap',
				gap: '1rem',
				marginTop: '2vw'
			}}>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '1rem',
					width: 'calc(80% - 1rem)' // 75% av bredden för att ha 3 kort bredvid varandra med en rems gap
				}}>
				{auctions ? (
					auctions.map((auction) => (
						<Card
							key={auction.AuctionID}
							onClick={() => navigateToAuctionRoute(auction)}
							style={{
								cursor: 'pointer',
								backgroundColor: 'rgb(209, 189, 185)',
								minWidth: '300px',
								flexBasis: '300px'
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
									<span>{auction.Titel}</span>
									<span>
										<b>Startpris: </b>
										<span
											style={{ color: 'darkred', textDecoration: 'underline' }}>
											{auction.StartingPrice} kr
										</span>
									</span>
									<br />
									<span>
										<b>Slutdatum: </b>
										{formatDate(auction.EndDate)}
									</span>
								</Card.Text>
							</Card.Body>
						</Card>
					))
				) : (
					<h1 style={{ marginLeft: '110%' }}>Laddar...</h1>
				)}
			</div>
			<div
				style={{
					width: 'calc(20% - 1rem)'
				}}>
				<Card
					style={{
						backgroundColor: 'lightgray',
						minWidth: '300px',
						flexBasis: '100%'
					}}>
					<Card.Body>
						<Card.Title>
							<h5>Klara auktioner:</h5>
							<Card.Text></Card.Text>
						</Card.Title>
					</Card.Body>
				</Card>
			</div>
		</div>
	);
};

export default Home;
