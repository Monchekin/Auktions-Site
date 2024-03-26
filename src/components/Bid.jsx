import React, { useState, useEffect, useRef } from 'react';

const Bid = ({ auctionId }) => {
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
            const response = await fetch(`https://auctioneer.azurewebsites.net/bid/j5t/${auctionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bid history');
            }
            const bidHistory = await response.json();
            setPreviousBids(bidHistory);
            // Beräkna det högsta budet
            const maxBidAmount = Math.max(...bidHistory.map(bid => bid.Amount));
            const maxBid = bidHistory.find(bid => bid.Amount === maxBidAmount);
            setCurrentBid(maxBid);
        } catch (error) {
            console.error('Error fetching bid history:', error);
        }
    };

    const handleBidSubmit = async (event) => {
        event.preventDefault();
        try {
            if (parseFloat(bidAmount) === parseFloat(currentBid?.Amount)) {
                setMessage('Du kan inte lägga ett bud med samma belopp som det aktuella budet.');
                return;
            }

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
            await fetchBidHistory();
            setMessage('Ditt bud har lagts');
            setBidAmount('');
            setBidder('');
        } catch (error) {
            console.error('Error placing bid:', error);
            setMessage('Något gick fel vid budgivningen');
        }
    };

    const validateBidAmount = (e) => {
        const bid = e.target.value;
        setBidAmount(bid);
        if (bid <= currentBid?.Amount) {
            setBidTooLow(true);
            addBidBtn.current.disabled = true;
        } else {
            setBidTooLow(false);
            addBidBtn.current.disabled = false;
        }
    }

    return (
        <div>
            <h2>Lägg bud på auktion</h2>
            {currentBid && (
                <div>
                    <h3>Aktuellt bud: {currentBid.Amount} SEK</h3>
                    <p>Budgivare: {currentBid.Bidder}</p>
                </div>
            )}
            <h3>Tidigare budhistorik:</h3>
            <ul>
                {previousBids.map((bid, index) => (
                    <li key={index}>
                        Bud: {bid.Amount} SEK, Budgivare: {bid.Bidder}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleBidSubmit}>
                <label htmlFor="bidAmount">Belopp:</label>
                <input type="number" id="bidAmount" value={bidAmount} onChange={validateBidAmount} required />
                <label htmlFor='bidder'>Namn:</label>
                <input type="text" id="bidder" value={bidder} onChange={(e) => setBidder(e.target.value)} required />
                <button ref={addBidBtn} type="submit">Lägg bud</button>
                {bidTooLow && <span style={{ color: 'red' }}>Budet måste vara högre än nuvarande bud</span>}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Bid;
