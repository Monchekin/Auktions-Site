import React, { useState } from 'react';

const Bid = ({ auctionId }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [message, setMessage] = useState('');
    const [bidder, setBidder] = useState('');

    const handleBidSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://auctioneer.azurewebsites.net/bid/j5t', {
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
            });
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
        <div>
            <h2>Lägg bud på auktion</h2>
            <form onSubmit={handleBidSubmit}>
                <label htmlFor="bidAmount">Belopp:</label>
                <input type="number" id="bidAmount" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
                <label htmlFor='bidder'>Namn:</label>
                <input type="text" id="bidder" value={bidder} onChange={(e) => setBidder(e.target.value)} required />
                <button type="submit">Lägg bud</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Bid;
