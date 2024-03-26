import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const Bid = ({ auctionId }) => {
	const [bidAmount, setBidAmount] = useState('');
	const [message, setMessage] = useState('');
	const [bidder, setBidder] = useState('');

	const handleBidSubmit = async (event) => {
		event.preventDefault();
		try {
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
			console.log('Budgivning lyckades');
			setMessage('Ditt bud har lagts');
			setBidAmount('');
			setBidder('');
		} catch (error) {
			console.error(error);
			setMessage('Något gick fel vid budgivningen');
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
				<form onSubmit={handleBidSubmit}>
					<h3>Lägg bud på auktionen</h3>
					<Card.Body>
						<Form.Group className='mb-3' controlId='bidAmount'>
							<label htmlFor='bidAmount'>Belopp:</label>
							<input
								type='text'
								id='bidAmount'
								style={{ width: '60%', marginLeft: '5%' }}
								value={bidAmount}
								onChange={(e) => setBidAmount(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='bidder'>
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

						<Button type='submit'>Lägg bud</Button>
					</Card.Body>
				</form>
				{message && <p>{message}</p>}
			</Card>
		</div>
	);
};

export default Bid;
