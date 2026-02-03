📝 Full Stack Todo / Notes Application

A secure, responsive, and animated full-stack Todo / Notes application built using React, Node.js, Express, MongoDB, and deployed on Vercel (Frontend) and Render (Backend).

🌐 Live Demo

🔗 Frontend:
👉 https://note-app-gamma-two.vercel.app

🔗 Backend API:
👉 https://note-app-qb8n.onrender.com

🖼️ Application Preview
4
🚀 Features
🔐 Authentication

User Register & Login

JWT-based secure authentication

Protected routes using React Context

✅ Todo Management

Create new todos

Fetch user-specific todos

Delete todos

Secure API access (token-based)

🎨 UI / UX

Fully responsive design

Animated UI using Tailwind CSS

Mobile-first layout

Clean & minimal interface

🌍 Deployment Ready

Frontend deployed on Vercel

Backend deployed on Render

Production-level CORS handling

🛠️ Tech Stack
Frontend

⚛️ React + Vite

🎨 Tailwind CSS

🔀 React Router DOM

🌐 Fetch API

🔐 Context API (Auth)

Backend

🟢 Node.js

🚂 Express.js

🍃 MongoDB + Mongoose

🔐 JWT Authentication

🌍 CORS enabled

📁 Project Structure
FullStackTodoApp/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Todos.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── todoService.js
│   │   └── App.jsx
│   ├── vercel.json
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   └── Todo.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── index.js

🔑 Environment Variables
Backend (.env)
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/fullstack-todo-app.git
cd fullstack-todo-app

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔒 API Routes
Auth
Method	Route	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Todos (Protected)
Method	Route	Description
GET	/api/todos	Get user todos
POST	/api/todos	Create todo
DELETE	/api/todos/:id	Delete todo
🧠 Key Learnings

JWT Authentication (Frontend + Backend)

React Context for global auth state

CORS handling between Render & Vercel

Secure API protection

Production-ready deployment

👨‍💻 Author

Aveenash Kumar
📧 Email: aveenashkumar68@gmail.com

💼 Aspiring Full-Stack Developer

⭐ Support

If you like this project:

⭐ Star the repo

🧑‍💻 Fork it

📢 Share it
