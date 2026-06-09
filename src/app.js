const express = require('express');
const osClient = require('./config/opensearch');

const uploadRouter = require('./routes/upload');

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const { body } = await osClient.cluster.health();
    res.json({ status: 'ok', opensearch: body.status });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use('/api', uploadRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;