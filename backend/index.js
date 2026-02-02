import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js"

dotenv.config();
connectDB();

const app = express();


app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://note-app-gamma-two.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`Server is connected at http://localhost:${PORT}`)
})