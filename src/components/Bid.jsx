import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const Bid = ({ auctionId, startingPrice }) => {
	const [bidAmount, setBidAmount] = useState('');
	const [message, setMessage] = useState('');
	const [bidder, setBidder] = useState('');
	const [currentBid, setCurrentBid] = useState(null);
	const [previousBids, setPreviousBids] = useState([]); // här har du datat från API!
	const [bidTooLow, setBidTooLow] = useState(false);
	const addBidBtn = useRef();

	useEffect(() => {
		fetchBidHistory();
	}, [auctionId]);

	const fetchBidHistory = async () => {
		try {
			const response = await fetch(
				`https://auctioneer.azurewebsites.net/bid/j5t/${auctionId}`
			);
			if (!response.ok) {
				throw new Error('Failed to fetch bid history');
			}
			const bidHistory = await response.json();
			setPreviousBids(bidHistory);
			// Beräkna det högsta budet
			const maxBidAmount = Math.max(...bidHistory.map((bid) => bid.Amount));
			const maxBid = bidHistory.find((bid) => bid.Amount === maxBidAmount);
			setCurrentBid(maxBid);
		} catch (error) {
			console.error('Error fetching bid history:', error);
		}
	};

	const handleBidSubmit = async (event) => {
		event.preventDefault();
		try {
			if (parseFloat(bidAmount) === parseFloat(currentBid?.Amount)) {
				setMessage(
					'Du kan inte lägga ett bud med samma belopp som det aktuella budet.'
				);
				return;
			}

			const response = await fetch(
				'https://auctioneer.azurewebsites.net/bid/j5t',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						AuctionID: auctionId,
						Amount: bidAmount,
						Bidder: bidder,
						GroupCode: 'j5t'
					})
				}
			);

			if (!response.ok) {
				throw new Error('Något gick fel vid budgivning');
			}

			await fetchBidHistory();
			setMessage('Ditt bud har lagts');
			setBidAmount('');
			setBidder('');
			console.log('Budgivning lyckades');
		} catch (error) {
			setMessage('Något gick fel vid budgivningen');
			console.error(error);
			console.error('Error placing bid:', error);
		}
	};

	const validateBidAmount = (e) => {
		const bid = e.target.value;
		setBidAmount(bid);
		if (!currentBid) {
			if (bid <= startingPrice) {
				setBidTooLow(true);
				addBidBtn.current.disabled = true;
			} else {
				setBidTooLow(false);
				addBidBtn.current.disabled = false;
			}
		} else {
			if (bid <= currentBid?.Amount) {
				setBidTooLow(true);
				addBidBtn.current.disabled = true;
			} else {
				setBidTooLow(false);
				addBidBtn.current.disabled = false;
			}
		}
	};
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '5vh',
				marginBottom: '4vh'
			}}>
			<Card
				style={{
					border: '1px solid black',
					textAlign: 'center',
					width: '70%',
					maxWidth: '500px',
					paddingTop: '4%',
					paddingBottom: '2%'
				}}>
				<Card.Body>
					{currentBid && (
						<div>
							<h3>Aktuellt bud: {currentBid.Amount} SEK</h3>
							<p>Budgivare: {currentBid.Bidder}</p>
						</div>
					)}

					<form onSubmit={handleBidSubmit}>
						<h4>Lägg ditt bud på auktionen</h4>
						<Form.Group className='mb-3' >
							<label htmlFor='bidAmount'>Belopp:</label>

							<input
								type='number'
								id='bidAmount'
								value={bidAmount}
								onChange={validateBidAmount}
								style={{ width: '60%', marginLeft: '5%' }}
								required
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<label htmlFor='bidder'>Namn: </label>
							<input
								type='text'
								id='bidder'
								style={{ width: '60%', marginLeft: '7%' }}
								value={bidder}
								onChange={(e) => setBidder(e.target.value)}
								required
							/>
						</Form.Group>

						<Button ref={addBidBtn} type='submit'>
							Lägg bud
						</Button>

						{bidTooLow && (
							<span style={{ color: 'red' }}>
								<br />
								Budet måste vara högre än nuvarande bud
							</span>
						)}
						{message && (
							<p style={{ marginTop: '5%', fontWeight: 'bolder' }}>{message}</p>
						)}
						<Card.Text
							style={{
								border: '1px lightgrey solid',
								padding: '5%',
								marginTop: '5%'
							}}>
							<h4>Budhistorik:</h4>
							<ul>
								{previousBids.map((bid, index) => (
									<li key={index}>
										<hr />
										<b>Bud:</b> {bid.Amount} SEK - <b>Budgivare:</b>{' '}
										{bid.Bidder}
									</li>
								))}
							</ul>
						</Card.Text>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Bid;
