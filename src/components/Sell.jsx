import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const Sell = () => {
	const [Title, setTitle] = useState('');
	const [Description, setDescription] = useState('');
	const [StartDate, setStartDate] = useState('');
	const [EndDate, setEndDate] = useState('');
	const [StartingPrice, setStartingPrice] = useState('');
	const [CreatedBy, setCreatedBy] = useState('');
	const [message, setMessage] = useState(''); // Tillståndsvariabel för meddelandet
	const [formError, setFormError] = useState('');

	const resetAuction = () => {
		setTitle('');
		setDescription('');
		setStartDate('');
		setEndDate('');
		setStartingPrice('');
		setCreatedBy('');
	};

	const handleSellSubmit = async (event) => {
		event.preventDefault();
		try {
			// Validera formulärdata innan du skickar till servern
			if (
				!Title ||
				!Description ||
				!StartDate ||
				!EndDate ||
				!StartingPrice ||
				!CreatedBy
			) {
				setFormError('Fyll i alla fält i formuläret');
				return;
			}

			const response = await fetch(
				'https://auctioneer.azurewebsites.net/auction/j5t',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						GroupCode: 'j5t',
						Title,
						Description,
						StartDate,
						EndDate,
						StartingPrice,
						CreatedBy
					})
				}
			);
			if (!response.ok) {
				throw new Error('Något gick fel vid tillägg av auktionen');
			}
			console.log('Auktion tillagd');
			<br />;
			setMessage('Auktionen är tillagd'); // Uppdatera meddelandetillståndsvariabeln
			resetAuction();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}>
			<Card
				style={{
					width: '50%',
					backgroundColor: 'rgb(209, 189, 185)'
				}}>
				<Card.Body>
					<Card.Title>Lägg till din auktion</Card.Title>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label className='Lable'>Titel:</Form.Label>
							<Form.Control
								type='text'
								id='title'
								value={Title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>{' '}
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label className='Lable'>Beskrivning:</Form.Label>
							<Form.Control
								as='textarea'
								id='description'
								rows={3}
								value={Description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label className='Lable'>Startdatum:</Form.Label>
							<Form.Control
								type='date'
								id='startDate'
								value={StartDate}
								onChange={(e) => setStartDate(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label className='Lable'>Slutdatum:</Form.Label>
							<Form.Control
								type='date'
								id='endDate'
								value={EndDate}
								onChange={(e) => setEndDate(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label className='Lable'>Startpris:</Form.Label>
							<Form.Control
								type='number'
								id='startingPrice'
								value={StartingPrice}
								onChange={(e) => setStartingPrice(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label className='Lable'>Skapad av:</Form.Label>
							<Form.Control
								type='text'
								id='createdBy'
								value={CreatedBy}
								onChange={(e) => setCreatedBy(e.target.value)}
								required
							/>
						</Form.Group>
						<Button onClick={handleSellSubmit}>Lägg till auktion</Button>
						{formError && <p style={{ color: 'red' }}>{formError}</p>}{' '}
						{/* Visa felmeddelande om formuläret är ogiltigt */}
						{message && message.length && <>{message}</>}
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Sell;
