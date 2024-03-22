import React, { useState } from 'react';

const Bid = () => {
    const [bidAmount, setBidAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleBidSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://auctioneer.azurewebsites.net/auction/bid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auctionId: ' ', // Ersätt med aktuell auktions ID
                    amount: bidAmount
                })
            });
            if (!response.ok) {
                throw new Error('Något gick fel vid budgivning');
            }
            console.log('Budgivning lyckades');
            setMessage('Ditt bud har lagts');
            setBidAmount(''); // Återställ budbeloppet efter framgångsrik budgivning
        } catch (error) {
            console.error(error);
            setMessage('Något gick fel vid budgivningen');
        }
    };

    return (
        <div>
            <h2>Lägg bud på auktion</h2>
            <form onSubmit={handleBidSubmit}>
                <label htmlFor="bidAmount">Belopp:</label>
                <input type="number" id="bidAmount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
                <button type="submit">Lägg bud</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Bid;
