# 1RN22IS041GAURI — Reorganized repository

This document contains a suggested project structure, a complete `README.md`, and ready-to-copy backend files (Node + TypeScript + Express) plus config files, `.gitignore`, and Docker setup. Use these to add a proper backend, documentation, and supporting files to the existing frontend.

---

## Proposed repository structure

```
1RN22IS041GAURI/
├── .github/
│   └── workflows/ci.yml            # optional: CI for lint/test
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .gitignore
│   └── src/
│       ├── server.ts
│       ├── app.ts
│       ├── routes/
│       │   └── stocks.ts
│       ├── controllers/
│       │   └── stocksController.ts
│       ├── services/
│       │   └── stockService.ts
│       └── utils/
│           └── logger.ts
├── frontend/                        # move existing React app here
│   ├── package.json
│   └── src/
│       ├── App.tsx
│       └── ... (existing files)
├── README.md                        # root README (generated below)
├── LICENSE                          # add an appropriate license
└── .gitignore
```

---

## Root README.md (complete — put in `README.md`)

````markdown
# Stock Aggregator — 1RN22IS041GAURI

**Description**

A React-based frontend that visualizes stock data (heatmaps, stock pages, correlation) and a Node + Express backend that provides stock data APIs, caching, and basic rate-limiting.

This repository has two main parts:
- `frontend/` — React app (existing project files moved here)
- `backend/` — Node + TypeScript Express API

## Features
- Frontend: correlation heatmaps, stock pages, charts, search
- Backend: REST API to fetch stock data, caching, route for correlation, basic validation
- Dockerized development environment

## Getting started (development)

### Prerequisites
- Node.js 18+ (or use Docker)
- npm or yarn
- Optional: Docker & Docker Compose

### Run backend locally

```bash
cd backend
npm install
cp .env.example .env   # set API keys or options if needed
npm run dev
````

Server runs on `http://localhost:4000` by default.

### Run frontend locally

```bash
cd frontend
npm install
npm start
```

Frontend dev server runs on `http://localhost:3000` and is configured to call backend at `http://localhost:4000` (CORS enabled).

### Docker (both services)

```bash
# from repo root
docker-compose up --build
```

This will bring up `backend` and `frontend` services with ports 4000 and 3000 exposed.

## API (basic)

* `GET /api/stocks/:symbol` — fetch latest data for a stock
* `GET /api/stocks?symbols=AAA,BBB` — fetch multiple stocks
* `GET /api/correlation?symbols=AAA,BBB,CCC` — return correlation matrix

## Tests & linting

* `npm run lint`
* `npm run test` (if you add tests)

## Contributing

* Open issues and PRs
* Follow the code style and add tests for new functionality

## License

Add a license file (MIT recommended for student projects)

````

---

## Backend files (copy into `backend/src/`)

### `package.json`

```json
{
  "name": "stock-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "start": "node dist/server.js",
    "lint": "eslint . --ext .ts",
    "format": "prettier --write ."
  },
  "dependencies": {
    "axios": "^1.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "node-cache": "^5.1.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/node": "^20.5.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.5.0"
  }
}
````

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### `.env.example`

```
PORT=4000
STOCK_API_KEY=your_api_key_here
CACHE_TTL_SECONDS=300
```

### `.gitignore` (backend)

```
node_modules/
dist/
.env
```

### `src/server.ts`

```ts
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
```

### `src/app.ts`

```ts
import express from 'express';
import cors from 'cors';
import stocksRouter from './routes/stocks';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/stocks', stocksRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

export default app;
```

### `src/routes/stocks.ts`

```ts
import { Router } from 'express';
import { getStock, getMultipleStocks, getCorrelation } from '../controllers/stocksController';

const router = Router();

router.get('/:symbol', getStock);
router.get('/', getMultipleStocks);
router.get('/correlation', getCorrelation);

export default router;
```

### `src/controllers/stocksController.ts`

```ts
import { Request, Response } from 'express';
import StockService from '../services/stockService';

export const getStock = async (req: Request, res: Response) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const data = await StockService.fetchStock(symbol);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
};

export const getMultipleStocks = async (req: Request, res: Response) => {
  try {
    const symbolsParam = req.query.symbols as string | undefined;
    if (!symbolsParam) return res.status(400).json({ error: 'symbols query required' });
    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());
    const data = await StockService.fetchMultiple(symbols);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
};

export const getCorrelation = async (req: Request, res: Response) => {
  try {
    const symbolsParam = req.query.symbols as string | undefined;
    if (!symbolsParam) return res.status(400).json({ error: 'symbols query required' });
    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());
    const matrix = await StockService.correlationMatrix(symbols);
    res.json(matrix);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute correlation' });
  }
};
```

### `src/services/stockService.ts`

```ts
import NodeCache from 'node-cache';
import axios from 'axios';

const cacheTtl = Number(process.env.CACHE_TTL_SECONDS || 300);
const cache = new NodeCache({ stdTTL: cacheTtl });

const STOCK_API_BASE = 'https://query1.finance.yahoo.com'; // example public endpoint

class StockService {
  static async fetchStock(symbol: string) {
    const key = `stock:${symbol}`;
    const cached = cache.get(key);
    if (cached) return cached;

    // Example: fetch quote summary from Yahoo
    const url = `${STOCK_API_BASE}/v7/finance/quote?symbols=${symbol}`;
    const resp = await axios.get(url);
    const quote = resp.data?.quoteResponse?.result?.[0] ?? null;
    cache.set(key, quote);
    return quote;
  }

  static async fetchMultiple(symbols: string[]) {
    const promises = symbols.map(s => this.fetchStock(s));
    return Promise.all(promises);
  }

  static async correlationMatrix(symbols: string[]) {
    // Simple approach: fetch historical close prices for past N days and compute correlation
    // For brevity this returns a mock identity-like matrix — replace with real computation
    const n = symbols.length;
    const matrix = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    );
    return { symbols, matrix };
  }
}

export default StockService;
```

### `src/utils/logger.ts`

```ts
export const log = (...args: unknown[]) => console.log('[stock-api]', ...args);
```

## Docker files (optional)

### `backend/Dockerfile`

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
CMD ["node", "dist/server.js"]
```

### `docker-compose.yml` (root or backend)

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - '4000:4000'
    environment:
      - PORT=4000
    volumes:
      - ./backend:/app
  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    volumes:
      - ./frontend:/app
```

## Frontend notes

* Move all frontend files into `frontend/` folder. Update `package.json` scripts if necessary.
* Update API base URL (e.g. `REACT_APP_API_BASE=http://localhost:4000/api`) and use it in `api.ts`.
* Ensure CORS is enabled on the backend (already in `app.ts`).

## Checklist to finish

* [ ] Move current frontend files into `frontend/`
* [ ] Add the backend files above into `backend/`
* [ ] Add a LICENSE (MIT)
* [ ] Add GitHub Actions CI (optional)
* [ ] Update frontend `api.ts` to point to backend endpoints
* [ ] Replace mock correlation with real computation using historical prices
* [ ] Add unit tests (Jest) and linting

---

If you want, I can:

* Create the actual files in the repository (I can provide the exact file contents you can copy).
* Generate a ready-to-download ZIP of the reorganized project (I can produce the files here).

Tell me which next step you'd like and I'll prepare the files accordingly.
