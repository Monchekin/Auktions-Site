import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Bid from './Bid';

const Auktion = () => {
	// Hämta den aktuella rutans plats från react-router
	const location = useLocation();
	// Hämta auktionen från den aktuella rutans state
	const auctionFromLocationState = location.state.auction;

	// Tillstånd för att lagra auktionsinformationen
	const [auctionInfo, setAuctionInfo] = useState(null);

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

	const [auctions, setAuctions] = useState(null);
	const [selectedAuctionId, setSelectedAuctionId] = useState(null);

	const handleBidButtonClick = (auctionId) => {
		setSelectedAuctionId(auctionId); // Uppdatera selectedAuctionId för att visa budkomponenten
	};

	// Fetch auktioner och rendera dem
	useEffect(() => {
		const getAuctions = async () => {
			try {
				const response = await fetch('https://auctioneer.azurewebsites.net/auction/j5t');
				if (!response.ok) {
					throw new Error('Något gick fel vid hämtning av auktioner');
				}
				const data = await response.json();
				setAuctions(data);
			} catch (error) {
				console.error(error);
			}
		};
		getAuctions();
	}, []);

	

	return (
		<div>
			{/* Rendera auktionsinformationen om den finns */}
			{auctionInfo ? (
					<div style={{ marginTop: '5vh' }}>
						<h2>
							<b>
								<u>{auctionInfo.Title}</u>
							</b>
						</h2>
						<p>
							<b>Description: </b>
						</p>
						<p>{auctionInfo.Description}</p>
						<p>
							<b>Start dete:</b> {auctionInfo.StartDate}
						</p>
						<p>
							<b>End date: </b>
							{auctionInfo.EndDate}
						</p>
						<p>
							<b>Starting Price: </b>
							{auctionInfo.StartingPrice} kr
						</p>
						<p>
							<b>Created By:</b> {auctionInfo.CreatedBy}
						</p>

						<button onClick={() => handleBidButtonClick(auctionInfo.AuctionID)}>Lägg bud</button>
							{selectedAuctionId === auctionInfo.AuctionID && <Bid auctionId={auctionInfo.AuctionID} />}
						
					</div>
				) : (
					// Visa meddelande om att auktionen inte kunde hittas
					<p>Auktionen kunde inte hittas.</p>
				)}

		</div>
	);
};

export default Auktion;
