import { useState, useEffect } from 'react';
const Auktion = () => {
	const [auctions, setAuctions] = useState(null);

	useEffect(() => {
		const getAuctions = () => {
			fetch('https://auctioneer.azurewebsites.net/auction/j5t')
				.then((res) => res.json())
				.then((data) => setAuctions(data));
		};

		getAuctions();

		return () => {
			// TODO: städa upp här
		};
	}, []);

	return (
		<div>
			<ul>
				{auctions &&
					auctions.map((auction) => (
						<li>
							<p>{auction.Title}</p>
							<p>{auction.Description}</p>
							{/* Split datestring maybe? */}
							<p>{auction.StartDate}</p>
							<p>{auction.EndDate}</p>
							<p>{auction.StartingPrice}</p>
							<p>{auction.CreatedBy}</p>
							<hr />
						</li>
					))}
			</ul>
		</div>
	);
};

export default Auktion;
