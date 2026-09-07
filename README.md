#  Farmer Market Intelligence

A full-stack agricultural marketplace and mandi price intelligence platform.

---

## Project Structure

```
farmer-market-intelligence/
├── frontend/                     # React + Vite Client Application
│   ├── src/
│   │   ├── components/           # UI Components (Farmer, Buyer, Admin, Modals)
│   │   ├── context/              # React Context (State Management)
│   │   ├── data/                 # Mandi catalog & mock models
│   │   ├── App.jsx               # Main React Application Component
│   │   ├── index.css             # Tailwind & Custom Styles
│   │   └── main.jsx              # Vite Entry Point
│   ├── index.html                # HTML Template
│   ├── package.json              # Frontend Dependencies & Scripts
│   ├── tailwind.config.js        # Tailwind CSS Configuration
│   ├── postcss.config.js         # PostCSS Configuration
│   └── vite.config.js            # Vite Bundler Configuration
│
├── backend/                      # Node.js + Express API Server
│   ├── src/
│   │   ├── controllers/          # Request Handlers (Mandi, Produce, Orders)
│   │   │   ├── mandiController.js
│   │   │   ├── produceController.js
│   │   │   └── orderController.js
│   │   ├── routes/               # Express Route Definitions
│   │   │   ├── mandiRoutes.js
│   │   │   ├── produceRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── data/                 # Seed & Mock Data
│   │   │   └── mockData.js
│   │   └── server.js             # Express App Entry Point
│   ├── .env.example              # Environment Variables Template
│   └── package.json              # Backend Dependencies & Scripts
│
├── package.json                  # Root Monorepo Scripts
└── README.md                     # Documentation
```

---

##  Getting Started

### 1. Install Dependencies

You can install dependencies for both `frontend` and `backend` directly from the project root:

```bash
npm run install:all
```

Or install them individually:
```bash
# Frontend
npm run install:frontend
# Backend
npm run install:backend
```

---

### 2. Running the Development Servers

#### Option A: Run Both Simultaneously
From the root directory:
```bash
npm run dev
```

#### Option B: Run Individually
- **Frontend only** (Runs on `http://localhost:5173`):
  ```bash
  npm run dev:frontend
  ```
  *(Or `cd frontend && npm run dev`)*

- **Backend only** (Runs on `http://localhost:5001`):
  ```bash
  npm run dev:backend
  ```
  *(Or `cd backend && npm run dev`)*

---

### 3. Backend API Endpoints

- **Health Check**: `GET /api/health`
- **Crops Catalog**: `GET /api/mandi/crops`
- **Mandi Prices**: `GET /api/mandi/prices`
- **Price Forecast**: `GET /api/mandi/forecast`
- **Produce Lots**:
  - `GET /api/produce/lots`
  - `POST /api/produce/lots`
  - `POST /api/produce/lots/:id/offers`
- **Buyer Demands**:
  - `GET /api/produce/demands`
  - `POST /api/produce/demands`
- **Orders & Logistics**:
  - `GET /api/orders`
  - `POST /api/orders`
  - `GET /api/transporters`
  - `GET /api/storages`
  - `POST /api/storages/book`

---

### 4. Production Build

To build the frontend for production:
```bash
npm run build
```
Output will be generated in `frontend/dist/`.

