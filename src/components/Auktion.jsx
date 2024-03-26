import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
						<b>Beskrivning: </b>
					</p>
					<p>{auctionInfo.Description}</p>

					<p>
						<b>Startdatum: </b>
						{new Date(auctionInfo.StartDate).toLocaleDateString('sv-SE')}
					</p>

					<p>
						<b>Slutdatum: </b>
						{new Date(auctionInfo.EndDate).toLocaleDateString('sv-SE')}
					</p>

					<p>
						<b>Startpris: </b>
						{auctionInfo.StartingPrice} kr
					</p>

					<p>
						<b>Skapad av:</b> {auctionInfo.CreatedBy}
					</p>

					<button onClick={() => handleBidButtonClick(auctionInfo.AuctionID)}>
						Lägg bud
					</button>

					{selectedAuctionId === auctionInfo.AuctionID && (
						<Bid auctionId={auctionInfo.AuctionID} />
					)}
				</div>
			) : (
				// Visa meddelande om att auktionen inte kunde hittas
				<p>Auktionen kunde inte hittas.</p>
			)}
		</div>
	);
};

export default Auktion;
