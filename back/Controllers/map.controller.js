const axios = require('axios');
require('dotenv').config()

const map_API = process.env.MAP_API_KEY;

const receiveAddress = async (req, res) => {
    const { address } = req.body;
    if (!address) {
        return res.status(400).json({ error: "Address is required" });
    }
    console.log("Received address:", address);
};

const getPlaceAutocomplete = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }
    const map_API = process.env.MAP_API_KEY;
    if (!map_API) {
        console.error('Maps API key is not set');
        return res.status(500).json({ error: "Maps API key is not set" });
    }
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodedQuery}&limit=5&format=json&apiKey=${map_API}`;
    try {
        const response = await axios.get(url);
        // console.log('Geoapify autocomplete response:', response.data);
        if (response.data.results && response.data.results.length > 0) {
            const suggestions = response.data.results.map(feature => ({
                name: feature.name,
                address: feature.formatted || 'No address available'
            }))
            // Change response key from 'suggestions' to 'data'
            return res.status(200).json({ data: suggestions });
        } else {
            return res.status(404).json({ message: "No autocomplete suggestions found" });
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        return res.status(500).json({ error: "Failed to fetch autocomplete suggestions" });
    }
};

module.exports = { receiveAddress, getPlaceAutocomplete };
