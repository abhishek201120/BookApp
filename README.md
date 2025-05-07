# 🛠️ Full Stack App – MERN Project

This is a full-stack application built with **MongoDB**, **Express.js**, **React**, and **Node.js (MERN stack)**. It includes authentication, protected routes, and is ready for deployment using **Netlify/Vercel** (frontend) and **Render/Fly.io** or similar (backend).

---


---

## 🚀 Features

- JWT-based Authentication
- Protected Routes
- Environment-based Config
- RESTful API with Express
- React Frontend with Axios + Routing
- Fully ready for deployment

---

Technologies Used
MongoDB + Mongoose

Express.js

Node.js

React (Vite)

React Router

JWT Authentication

Axios

dotenv



## ⚙️ Setup Instructions

### 1. Clone the Repository


  ```
  git clone https://github.com/yourusername/your-repo-name.git
  cd your-repo-name
```

### 2. Backend Setup (/backend)
```      
cd backend
npm install
```

Create a .env file:
```
PORT=5000
DB_URI=mongodb://localhost:27017/your-db
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=Token_expire_time
NODE_ENV=development or Production
```

Run the server:
```
node server
```

### 3. Frontend Setup (/frontend)
```
cd ../frontend
npm install

```

Create a .env file:
```
VITE_API_URL=http://localhost:your-port-of-backend/api
```

Run the frontend:
```
npm run dev
```













