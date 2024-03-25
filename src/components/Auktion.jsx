import React, { useState, useEffect } from 'react';
import Bid from './Bid';

const Auktion = () => {
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
			<h2>Auktioner</h2>
			<ul>
				{auctions &&
					auctions.map((auction) => (
						<li key={auction.AuctionID}>
							<p>{auction.Title}</p>
							<p>{auction.Description}</p>
							<p>{auction.StartDate}</p>
							<p>{auction.EndDate}</p>
							<p>{auction.StartingPrice}</p>
							<p>{auction.CreatedBy}</p>
							<button onClick={() => handleBidButtonClick(auction.AuctionID)}>Lägg bud</button>
							{selectedAuctionId === auction.AuctionID && <Bid auctionId={auction.AuctionID} />}
						</li>
					))}
			</ul>
		</div>
	);
};

export default Auktion;
