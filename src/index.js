require('dotenv').config();
const express = require('express');
const osClient = require('./config/opensearch');

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const { body } = await osClient.cluster.health();
    res.json({ status: 'ok', opensearch: body.status });
  } 
  catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});