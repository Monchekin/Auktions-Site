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
			<p>Hej från Auktion</p>

			{JSON.stringify(auctions)}
		</div>
	);
};

export default Auktion;
