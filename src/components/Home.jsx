import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";

const Home = ({ auctions, setAuctions }) => {
  const navigate = useNavigate();
  const [expiredAuctions, setExpiredAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State för sökterm

  useEffect(() => {
    const getAuctions = () => {
      fetch("https://auctioneer.azurewebsites.net/auction/j5t")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          const now = new Date();
          const activeAuctions = data.filter(
            (auction) => new Date(auction.EndDate) >= now
          );
          const expiredAuctions = data.filter(
            (auction) => new Date(auction.EndDate) < now
          );
          setAuctions(activeAuctions);
          setExpiredAuctions(expiredAuctions);
        })
        .catch((error) => console.error("Error fetching auctions:", error));
    };
    getAuctions();
  }, []);


  const navigateToAuctionRoute = (auction) => {
    navigate(`/auktion/${auction.AuctionID}`, {
      state: {
        auction: auction,
        startDate: new Date(auction.startDate),
        endDate: new Date(auction.endDate),
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE");
  };
  const handleOnDelete = async (auctionId, e) => {
    e.stopPropagation(); // Stop event propagation
    try {
      const response = await fetch(
        "https://auctioneer.azurewebsites.net/auction/j5t/" + auctionId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            GroupCode: "j5t",
            AuctionID: auctionId,
          }),
        }
      );
      if (response.ok) {
        console.log("Auction deleted!");
        // Perform delete operation based on auctionId
        console.log("Delete auction with ID:", auctionId);
        // Filter out the auction with the specified AuctionID
        const updatedAuctions = auctions.filter(
          (auction) => auction.AuctionID !== auctionId
        );
        setAuctions(updatedAuctions);
      } else {
        console.error("Failed to delete auction!");
        // Add error message to alert user
        alert("Failed to delete auction. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Add error message to alert user
      alert("An error occurred. Please try again later.");
    }
  };



  const navigateToAuctionRoute = (auction) => {
    navigate(`/auktion/${auction.AuctionID}`, {
      state: {
        auction: auction,
        startDate: new Date(auction.startDate),
        endDate: new Date(auction.endDate),
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE");
  };

  
	const handleOnDelete = async (auctionId, e) => {
		e.stopPropagation(); // Stop event propagation
		try {
		  const response = await fetch('https://auctioneer.azurewebsites.net/auction/j5t/' + auctionId, {
			method: 'DELETE',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			  GroupCode: 'j5t',
			  AuctionID: auctionId
			})
		  });
		  if (response.ok) {
			console.log('Auction deleted!');
			// Perform delete operation based on auctionId
			console.log('Delete auction with ID:', auctionId);
			// Filter out the auction with the specified AuctionID
			const updatedAuctions = auctions.filter(
			  (auction) => auction.AuctionID !== auctionId
			);
			setAuctions(updatedAuctions);
		  } else {
			console.error('Failed to delete auction!');
			// Add error message to alert user
			alert('Failed to delete auction. Please try again later.');
		  }
		} catch (error) {
		  console.error('Error:', error);
		  // Add error message to alert user
		  alert('An error occurred. Please try again later.');
		}
	  };

  // Hantera ändringar i sökrutan
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        marginTop: "2vw",
      }}
    >
      {/* Sökning */}
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Sök på aktiva annonser"
          aria-label="Sök på aktiva annonser"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          width: "calc(80% - 1rem)",
          height: "20%",
          marginTop: "2.6%",
        }}
      >
        {auctions ? (
          [...auctions]
            .filter((auction) =>
              auction.Title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .reverse()
            .map((auction) => (
              <Card
                key={auction.AuctionID}
                onClick={() => navigateToAuctionRoute(auction)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgb(209, 189, 185)",
                  minWidth: "300px",
                  flexBasis: "300px",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Title
                        style={{
                          margin: "0 auto",
                        }}
                      >
                        <span>
                          <b>
                            <u>{auction.Title}</u>
                          </b>
                        </span>
                      </Card.Title>

                      <div>
                        <Button
                          variant="danger"
                          onClick={(e) => handleOnDelete(auction.AuctionID, e)}
                        >
                          x
                        </Button>
                      </div>
                    </div>
                  </Card.Title>
                  <Card.Text>
                    <span>{auction.Titel}</span>
                    <span>
                      <b>Startpris: </b>
                      <span
                        style={{
                          color: "darkred",
                          textDecoration: "underline",
                        }}
                      >
                        {auction.StartingPrice} kr
                      </span>
                    </span>
                    <br />
                    <span>
                      <b>Slutdatum: </b>
                      {formatDate(auction.EndDate)}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
        ) : (
          <h1 style={{ marginLeft: "45%" }}>Laddar...</h1>
        )}
      </div>

      <div style={{ width: "calc(20% - 1rem)" }}>
        <h5
          style={{
            justifyContent: "center",
          }}
        >
          <b>Avslutade Auktioner:</b>{" "}
        </h5>
        {expiredAuctions.length > 0 ? (
          expiredAuctions
            .sort((a, b) => new Date(b.EndDate) - new Date(a.EndDate))
            .map((auction) => (
              <Card
                key={auction.AuctionID}
                style={{
                  marginBottom: "10px",
                  opacity: "80%",
                  backgroundColor: "lightgray",
                  minWidth: "300px",
                  flexBasis: "100%",
                }}
              >
                <Card.Title>
                  <p style={{ marginTop: "5%", marginBottom: "-5%" }}>
                    <b>{auction.Title}</b>
                  </p>
                </Card.Title>
                <Card.Body>
                  <span>
                    <b>Auktionen Avslutades: </b>
                    {formatDate(auction.EndDate)}
                  </span>
                  <br />
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Auktionen är avslutad
                  </span>
                </Card.Body>
              </Card>
            ))
        ) : (
          <p>Inga klara auktioner.</p>
        )}
      </div>
    </div>
  );
};

export default Home;