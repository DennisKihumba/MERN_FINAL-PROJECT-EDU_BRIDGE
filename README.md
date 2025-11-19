website link: https://edu-bridge-phi.vercel.app/


Features
🔐 User Authentication

JWT-based login and registration

Secure password hashing with bcrypt

Protected API routes

👥 Community Forum

Create threads

Post replies

Real-time updates with Socket.io

Thread-based rooms for smooth live messaging

☁️ Cloudinary Uploads

Upload images or files

Cloud-based storage

Secure and optimized delivery

📡 API + WebSockets

Express + Node backend

Socket.io for real-time communication

RESTful API routes for authentication and forum

💾 Database

MongoDB Atlas

Mongoose models for Users, Threads, and Messages

🌐 Deployment

Backend deployed on Render

Frontend deployed on Vercel

Environment variables securely configured on both sides

🛠 Tech Stack
Frontend

React (Vite / CRA)

Axios

Socket.io-client

CSS / Tailwind

Backend

Node.js

Express.js

Socket.io

Cloudinary SDK

JWT authentication

Mongoose

Database

MongoDB Atlas

📁 Project Structure
Edu-Bridge/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── index.html
│
├── server/                # Node + Express Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md

🔧 Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_URL=https://your-frontend-url.vercel.app

Frontend (.env)

If using Vite:

VITE_API_URL=https://your-backend.onrender.com


If using CRA:

REACT_APP_API_URL=https://your-backend.onrender.com

▶️ Running the Project Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

2️⃣ Install backend dependencies
cd server
npm install

3️⃣ Install frontend dependencies
cd ../client
npm install

4️⃣ Start backend
cd server
npm run dev

5️⃣ Start frontend
cd client
npm run dev

💬 Real-Time Features (Socket.io)

Users join thread rooms when viewing a thread

Messages broadcast to everyone inside that room

New threads broadcast globally

Socket events include:

joinThread
sendMessage
receiveMessage
createThread

📸 File Uploads (Cloudinary)

The backend handles uploads using:

cloudinary.uploader.upload()


Uploads return a URL which the frontend displays instantly.

📤 Deployment
Frontend – Vercel

Connect GitHub repo

Add environment variables

Deploy

Backend – Render

Create new Web Service

Connect GitHub repo

Add environment variables

Start build

👨‍💻 Author

Dennis Kihumba
Full-Stack Developer | MERN | Chess Coach | Educator
