# B2B Marketplace Platform

Scalable, Monolithic-repo structure for the B2B Marketplace.

## Prerequisites
- Node.js v18+
- Docker & Docker Compose
- PostgreSQL (Local or Docker)

## Quick Start

### 1. Install Dependencies
Run this from the root directory:
```bash
npm install
npm run install:all
```

### 2. Setup Database
```bash
# Ensure Docker is running
docker-compose up -d postgres

# Push Schema
npm run db:push
```

### 3. Run Application
Start both Backend (Port 3001) and Frontend (Port 3000):
```bash
npm run dev
```
