# 📈 Stock Aggregator — 1RN22IS041GAURI

A modern **stock visualization and analysis platform** built with **React (frontend)** and **Node.js + TypeScript (backend)**. It provides real-time stock data, correlation heatmaps, and historical trend analysis through an elegant and interactive UI.

---

## 🚀 Overview

This project aims to simplify stock data exploration for students, developers, and finance enthusiasts. It integrates financial APIs, processes data on the backend, and displays visually appealing charts on the frontend.

### 🧩 Tech Stack

| Layer             | Technology                            |
| ----------------- | ------------------------------------- |
| **Frontend**      | React, TypeScript, TailwindCSS        |
| **Backend**       | Node.js, Express, TypeScript          |
| **Data Fetching** | Axios, Yahoo Finance API (or similar) |
| **Caching**       | Node-Cache                            |
| **Dev Tools**     | ESLint, Prettier, Docker              |

---

## 🗂️ Project Structure

```
1RN22IS041GAURI/
├── backend/               # Node + Express API service
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic
│   │   └── utils/         # Helpers and loggers
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/              # React app for visualization
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Stock page, Home page, etc.
│   │   └── utils/         # API helpers
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml     # Combined frontend + backend dev setup
├── README.md
└── LICENSE
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* (Optional) Docker & Docker Compose

### 1️⃣ Setup the Backend

```bash
cd backend
npm install
cp .env.example .env   # configure API keys
npm run dev            # start development server
```

Backend runs at `http://localhost:4000`.

### 2️⃣ Setup the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`.

### 🐳 Run Both with Docker

```bash
docker-compose up --build
```

Both frontend and backend will be available automatically.

---

## 🧠 API Endpoints

| Endpoint                                         | Method | Description                   |
| ------------------------------------------------ | ------ | ----------------------------- |
| `/api/stocks/:symbol`                            | GET    | Fetch data for a single stock |
| `/api/stocks?symbols=AAPL,TSLA`                  | GET    | Fetch multiple stocks         |
| `/api/stocks/correlation?symbols=AAPL,TSLA,NVDA` | GET    | Compute correlation matrix    |
| `/api/health`                                    | GET    | Health check                  |

---

## 📊 Features

✅ Real-time stock fetching from external APIs
✅ Correlation heatmap visualization
✅ Stock-specific charts and details
✅ API caching for performance
✅ Modular, maintainable TypeScript codebase
✅ Dockerized full-stack development environment

---

## 🧪 Development & Testing

```bash
npm run lint      # check for lint errors
npm run format    # auto-format code
npm run test      # (add tests later)
```

---

## 🛠️ Environment Variables (`backend/.env`)

```
PORT=4000
STOCK_API_KEY=your_api_key_here
CACHE_TTL_SECONDS=300
```

---

## 💡 Future Enhancements

* Add database support (MongoDB / PostgreSQL)
* Implement authentication for user portfolios
* Add WebSocket support for live updates
* Enhance correlation algorithm using real historical data

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request 🎉

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use and modify it for learning or personal projects.

---

## ✨ Author

**Gauri [1RN22IS041]**
Built as part of an academic project to demonstrate full-stack web development and data visualization using React and Node.js.
