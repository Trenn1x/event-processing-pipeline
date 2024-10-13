const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Event Processing API is running');
});

app.post('/api/events', async (req, res) => {
    const event = req.body;

    try {
        // Send the event to the Python API for enrichment
        const response = await axios.post('http://localhost:5000/enrich', event);

        // Log the enriched event data
        console.log('Enriched event:', response.data);

        // Respond with the enriched event
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error enriching event:', error);
        res.status(500).json({ message: 'Error enriching event' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

