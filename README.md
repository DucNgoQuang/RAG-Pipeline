# NodeRAG
- A Retrieval-Augmented Generation (RAG) pipeline built with Node.js and OpenSearch
- Accepts document uploads, converts them to vector mebeddings, and answers user queries by retrieving relevant context before calling an LLM

## Architecture
- **API Gateway**: Express.js, entry point for all requests
- **Ingestion Service**: Parses, chunks, and embeds uploaded documents
- **OpenSearch**: Stores and searches vectors via k-NN index
- **LLM Layer**: Generates answers grounded in retrieved context

## Prerequisites
- Node.js 20+
- Docker Desktop

## Getting started
### 1. Clone and install
git clone https://github.com/YOUR_USERNAME/noderag.git

cd noderag

npm install

### 2. Configure environment
cp .env.example .env
- Open .env and fill in your API keys

### 3. Run locally
docker-compose up --build

### 4. Verify
curl http://localhost:3000/health
- Should show {"status":"ok","opensearch":"green"} or {"status":"ok","opensearch":"yellow"} 

## Environment variables
| Variable | Description |
|-|-|
| 'PORT' | Port the Node.js server listens on (default: 3000) |
| 'NODE_ENV' | `development` or `production` |
| 'OPENSEARCH_HOST' | OpenSearch URL (default: http://localhost:9200)|
| 'OPENSEARCH_INDEX' | Index name for document vectors |
| 'EMBEDDING_API_KEY' | API key for the embedding model |
| 'EMBEDDING_MODEL' | Embedding model name |
| 'LLM_API_KEY' | API key for the LLM |
| 'LLM_MODEL' | LLM model name |

## Project structure
- src/
    - routes/ - Express route handlers
    - services/ - Ingestion, embedding, OpenSearch logic
    - config/ - OpenSeach client, env loader
    - middleware/ - Error handler, request logger

## Available scripts
| Command | Description |
|-|-|
| `npm start` | Run the app |
| `npm run dev` | Run with hot-reload (nodemon) |
| `npm run lint` | Check for lint errors |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Formal all files with Prettier |