import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Auktion = () => {
	const location = useLocation();
	const auctionFromLocationState = location.state.auction;

	// Tillstånd för att lagra auktionsinformationen
	const [auctionInfo, setAuctionInfo] = useState(null);

	useEffect(() => {
		if (auctionFromLocationState) {
			setAuctionInfo(auctionFromLocationState);
		} else {
			console.log(
				'useLocation har inget state, således fungerar inte navigateToAuctionRoute korrekt.'
			);
		}
	}, []);

	return (
		<div>
			{/* Om auctionInfo är sant (inte null eller undefined) renderas följande:*/}
			{auctionInfo ? (
				<div style={{ marginTop: '5vh' }}>
					<h1>{auctionInfo.Title}</h1>
					<p>{auctionInfo.Description}</p>
					<p>{auctionInfo.StartDate}</p>
					<p>{auctionInfo.EndDate}</p>
					<p>{auctionInfo.StartingPrice}</p>
					<p>{auctionInfo.CreatedBy}</p>
				</div>
			) : (
				// Om auctionInfo inte är falskt (null eller undefined) renderas följande:
				<p>Auktionen kunde inte hittas.</p>
			)}
		</div>
	);
};

export default Auktion;
