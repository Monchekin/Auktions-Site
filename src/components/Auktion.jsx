import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

const Auktion = ({ auction, AuthorizeId }) => {
	// Tillstånd för att lagra auktionsinformationen
	const [auctionInfo, setAuctionInfo] = useState(null);

	// const { id } = useParams();
	// const auction = auctions.find((auction) => auction.AuctionID === id);

	// useEffect-hook för att hämta auktionsinformation när AuthorizeId ändras eller när komponenten monteras
	useEffect(() => {
		// Funktion för att hämta auktionsinformation
		const getAuctionInfo = () => {
			// Hitta den auktion vars ID matchar AuthorizeId
			const foundAuction = auction.find(
				(auction) => auction.id === AuthorizeId
			);
			// Uppdatera tillståndet med auktionsinformationen
			setAuctionInfo(foundAuction);
		};

		// Kör funktionen för att hämta auktionsinformation om AuthorizeId finns
		if (AuthorizeId) {
			getAuctionInfo();
		}
	}, [AuthorizeId, auction]);

	return (
		<div>
			<p>hej!</p>
			{/* {JSON.stringify(auction)} */}
			<ul>
				{auctionInfo && (
					<li>
						<h1>{auctionInfo.Title}</h1>
						<p>{auctionInfo.Description}</p>

						<p>{auctionInfo.StartDate}</p>
						<p>{auctionInfo.EndDate}</p>
						<p>{auctionInfo.StartingPrice}</p>
						<p>{auctionInfo.CreatedBy}</p>
						<br />
						<hr />
						{JSON.stringify(auctionInfo)}
						<button> klick</button>
					</li>
				)}
				<li>TEST</li>
			</ul>
		</div>
	);
};

export default Auktion;
