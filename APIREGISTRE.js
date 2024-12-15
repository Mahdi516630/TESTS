const express = require('express');
const axios = require('axios');
const app = express();

// Your Amadeus API credentials
const amadeusClientId = 'YOUR_AMADEUS_CLIENT_ID';
const amadeusClientSecret = 'YOUR_AMADEUS_CLIENT_SECRET';

app.get('/get-flights', async (req, res) => {
  try {
    // Requesting the Amadeus API for flight offers
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: amadeusClientId,
      client_secret: amadeusClientSecret,
    }));

    const accessToken = response.data.access_token;

    const flightSearchResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        originLocationCode: 'JFK', // For example, New York (JFK)
        destinationLocationCode: 'LAX', // Los Angeles (LAX)
        departureDate: '2024-12-15',
        adults: 1,
      },
    });

    // Send back the flight offers data
    res.json(flightSearchResponse.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
