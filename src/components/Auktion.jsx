import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Bid from './Bid';

const Auktion = () => {
	const location = useLocation();
	const auctionFromLocationState = location.state.auction;

	const [auctionInfo, setAuctionInfo] = useState(null);
	const [selectedAuctionId, setSelectedAuctionId] = useState(null);

	useEffect(() => {
		// Kontrollera om det finns en auktion i state från platsen
		if (auctionFromLocationState) {
			// Om auktionen finns, uppdatera auktionsinformationen i state
			setAuctionInfo(auctionFromLocationState);
		} else {
			// Om ingen auktion finns i state, logga ett felmeddelande
			console.log(
				'useLocation har inget state, således fungerar inte navigateToAuctionRoute korrekt.'
			);
		}
	}, []);

	const handleBidButtonClick = (auctionId) => {
		// Uppdatera selectedAuctionId för att visa budkomponenten
		setSelectedAuctionId(auctionId);
	};

	return (
		<div style={{ marginTop: '5vh' }}>
			{/* Rendera auktionsinformationen om den finns */}
			{auctionInfo ? (
				<Card
					style={{
						marginTop: '5vh',
						width: '50%',
						margin: '0 auto',
						textAlign: 'center',
						border: 'black 2px solid',
						backgroundColor: 'rgb(209, 189, 185)'
					}}>
					<Card.Body>
						<Card.Title className='cardTitle'>
							<h3>
								<b>
									<u>{auctionInfo.Title}</u>
								</b>
							</h3>
						</Card.Title>
						<Card.Text>
							<p className='cardText'>
								<b>Beskrivning: </b> <br></br>
							</p>
							<p
								style={{
									border: 'black solid 1px',
									width: '80%',
									margin: '0 auto',
									textAlign: 'center',
									padding: '1%',
									backgroundColor: 'white'
								}}>
								{auctionInfo.Description}
							</p>
						</Card.Text>
						<Card.Text>
							<p>
								<b>Startdatum: </b>
								{new Date(auctionInfo.StartDate).toLocaleDateString('sv-SE')}
							</p>
						</Card.Text>
						<Card.Text>
							<p>
								<b>Slutdatum: </b>
								{new Date(auctionInfo.EndDate).toLocaleDateString('sv-SE')}
							</p>
						</Card.Text>
						<Card.Text>
							<p>
								<u>
									<b>Startpris: </b>
									<span style={{ color: 'darkred' }}>
										{auctionInfo.StartingPrice} kr{' '}
									</span>
								</u>
							</p>
						</Card.Text>
						<Card.Text>
							<p>
								<b>Skapad av:</b> {auctionInfo.CreatedBy}
							</p>
						</Card.Text>
						<Button
							className='budBtn'
							onClick={() => handleBidButtonClick(auctionInfo.AuctionID)}>
							Lägg ditt bud
						</Button>
						{selectedAuctionId === auctionInfo.AuctionID && (
							<Bid
								auctionId={auctionInfo.AuctionID}
								startingPrice={auctionInfo.StartingPrice}
							/>
						)}
					</Card.Body>
				</Card>
			) : (
				// Visa meddelande om att auktionen inte kunde hittas
				<p>Auktionen kunde inte hittas.</p>
			)}
		</div>
	);
};

export default Auktion;
