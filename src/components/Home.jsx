import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Home = ({ auctions, setAuctions }) => {
	const navigate = useNavigate();
	const [expiredAuctions, setExpiredAuctions] = useState([]);

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
					const now = new Date();
					const activeAuctions = data.filter(
						(auction) => new Date(auction.EndDate) >= now
					);
					const expiredAuctions = data.filter(
						(auction) => new Date(auction.EndDate) < now
					);
					setAuctions(activeAuctions);
					setExpiredAuctions(expiredAuctions);
				})
				.catch((error) => console.error('Error fetching auctions:', error));
		};
		getAuctions();
	}, []);

	const getExpiredAuctions = (auctionsData) => {
		const expiredAuctions = auctionsData.filter(
			(ad) => new Date(ad.EndDate) < new Date()
		);
		setExpiredAuctions(expiredAuctions);
	};

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

	const handleOnDelete = (auctionId, e) => {
		e.stopPropagation(); // Stop event propagation
		// Perform delete operation based on auctionId
		console.log('Delete auction with ID:', auctionId);
		// Filter out the auction with the specified AuctionID
		const updatedAuctions = auctions.filter(
			(auction) => auction.AuctionID !== auctionId
		);
		setAuctions(updatedAuctions);
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
					width: 'calc(80% - 1rem)',
					height: '20%',
					marginTop:'2.8%'
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
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center'
										}}>
										<div>
											<b>
												<u>{auction.Title}</u>
											</b>
										</div>
										<div>
											<Button
												variant='danger'
												onClick={(e) => handleOnDelete(auction.AuctionID, e)}>
												x
											</Button>
										</div>
									</div>
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
					<h1 style={{ marginLeft: '45%' }}>Laddar...</h1>
				)}
			</div>

			<div style={{ width: 'calc(20% - 1rem)' }}>
				<h5
					style={{
						justifyContent: 'center'
					}}>
					<b>Avslutade Auktioner:</b>{' '}
				</h5>
				{expiredAuctions.length > 0 ? (
					expiredAuctions.map((auction) => (
						<Card
							key={auction.AuctionID}
							style={{
								marginBottom: '10px',
								opacity: '80%',
								backgroundColor: 'lightgray',
								minWidth: '300px',
								flexBasis: '100%'
							}}>
							<Card.Title>
								<p style={{ marginTop: '5%', marginBottom: '-5%' }}>
									<b>{auction.Title}</b>
								</p>
							</Card.Title>
							<Card.Body>
								<span>
									<b>Auktionen Avslutades: </b>
									{formatDate(auction.EndDate)}
								</span>
								<br />
								<span style={{ color: 'red', fontWeight: 'bold' }}>
									Auktionen är avslutad
								</span>
							</Card.Body>
						</Card>
					))
				) : (
					<p>Inga klara auktioner.</p>
				)}
			</div>
		</div>
	);
};

export default Home;
