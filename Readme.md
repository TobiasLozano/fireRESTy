# 🔥 FireRESTy

**FireRESTy** is a web client for Firebase — but more than that, it helps you migrate your **Firestore collections** into **MongoDB schemas**, and generates REST-like endpoints for querying and managing your data.

## ✨ Features

### 🧩 Frontend (React + Vite)
- Material UI design (similar to Firebase)
- Upload Firebase service account JSON (secure and encrypted)
- Store Firebase credentials (encrypted)
- View collections from Firestore
- Generate and edit MongoDB-compatible schemas
- Preview data tables from collections
- Export schema to:
  - **MongoDB** (BSON types, depth, required)
- Use headers to access Firebase via REST
- Drawer navigation:
  - Select project
  - View/edit schemas
  - View/edit endpoints
  - View data in tables

### 🛠 Backend (Express + MongoDB)
- Save generated collection schemas and endpoints
- Generate **REST endpoints**   [PostgREST-style](https://docs.postgrest.org/en/v13/) for each collection
- Support running data migration (Firestore ➜ MongoDB)

---

## 🧪 Local Development (with Docker Compose)

### 🧰 Prerequisites
- Docker and Docker Compose
- MongoDB runs inside a container


### 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/TobiasLozano/fireRESTy.git
   cd fireRESTy 
2. Run all services:
  ```bash 
  docker-compose up --build
  ```

3. Visit:


    Frontend: http://localhost:5173

    Backend API: http://localhost:3000