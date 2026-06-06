const { Client } = require('@opensearch-project/opensearch');

const client = new Client({
  node: process.env.OPENSEARCH_HOST || 'http://localhost:9200',
});

module.exports = client;
