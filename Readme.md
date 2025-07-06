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

    Backend API & React SSR: http://localhost:3000

## Features
### Home page
Show info about the project
![Screenshot of home page](/assets/Home.png)

### Projects
Here you can upload the firebase.cert.json file
![Screenshot of upload file page](/assets/project%201.png)
You can also delete the project data from local local storage or select another
![Screenshot of clear page](/assets/Project%202.png)
When a project is selected, you get access to next views:
### Data
Browse first 5 collections document and you can generate a mongoDB schema from that. Useful for data migration.
![Screenshot of data collection page](/assets/Data.png)
### Schemas
You can browse schemas generated for your selected project and check for changes over schemas previously saved.
![Screenshot of schemas page](/assets/schemas.png)
### Endpoints
You can see the available endpoints listed from collections.
![Screenshot of endpoints page](/assets/endpoints%201.png)
 If there is any schema saved from your collection, you will get it from here.
![Screenshot of endpoint schema page](/assets/endpoints%202.png)
You can interact with your Firestore DB with these endpoints via http request from Postman, your app, microcontrollers or whatever you need.
You will get an CURL example to test it
![Screenshot of endpoint schema page](/assets/WhatsApp%20Image%202025-07-06%20at%2012.21.17%20AM.jpeg)
## Watch the video for demo project
[![Watch the video](/assets/fireResty%20logo.png)](/assets/Devlog%209-2025-06-26_05.25.44.mp4)
## Or visit 
https://fireresty.onrender.com/
