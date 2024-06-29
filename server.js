const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-campaign', async (req, res) => {
  const url = 'https://unpkg.com/rapidoc/dist/rapidoc-min.js';
  const data = {
    name: 'Thrifty Voyage',
    type: 'bulk',
    recipients: [
      { name: 'Nilanjan Joarder', phone: '+91 9674771591' }
    ],
    message: 'This is our cab booking'
  };

  const headers = {
    'Authorization': 'Bearer BLSvhTk2.B5mI2nDhq6Vjq3VLqnaV4fUQwLm9osaD',
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(url, data, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
});

const PORT = 5500; // Updated port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
