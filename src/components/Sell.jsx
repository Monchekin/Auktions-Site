import React, { useState } from 'react';

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
			if (!Title || !Description || !StartDate || !EndDate || !StartingPrice || !CreatedBy) {
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
			setMessage('Auktion tillagd'); // Uppdatera meddelandetillståndsvariabeln
			resetAuction();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Lägg till ny auktion</h2>
			<label htmlFor='title'>Titel:</label>
			<input
				type='text'
				id='title'
				value={Title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>{' '}
			<br />
			<label htmlFor='description'>Beskrivning:</label>
			<input
				type='text'
				id='description'
				value={Description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<br />
			<label htmlFor='startDate'>Startdatum :</label>
			<input
				type='date'
				id='startDate'
				value={StartDate}
				onChange={(e) => setStartDate(e.target.value)}
				required
			/>
			<br />
			<label htmlFor='endDate'>Slutdatum :</label>
			<input
				type='date'
				id='endDate'
				value={EndDate}
				onChange={(e) => setEndDate(e.target.value)}
				required
			/>
			<br />
			<label htmlFor='startingPrice'>Startpris:</label>
			<input
				type='number'
				id='startingPrice'
				value={StartingPrice}
				onChange={(e) => setStartingPrice(e.target.value)}
				required
			/>
			<br />
			<label htmlFor='createdBy'>Skapad av:</label>
			<input
				type='text'
				id='createdBy'
				value={CreatedBy}
				onChange={(e) => setCreatedBy(e.target.value)}
				required
			/>
			<br />
			<button onClick={handleSellSubmit}>Lägg till auktion</button>
			{formError && <p style={{ color: 'red' }}>{formError}</p>} {/* Visa felmeddelande om formuläret är ogiltigt */}
			{message && <p>{message}</p>} {/* Visa meddelandet om det finns */}
		</div>
	);
};

export default Sell;
