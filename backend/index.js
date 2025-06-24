import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path';
// DB
import connectDB from './db/connection.js'

// Routes
import UsersRouter from './routes/users.routes.js'
import ProductsRouter from './routes/products.routes.js'


import { fileURLToPath } from "url";
import { URL } from "url";

const app = express()
const PORT = 2508;

dotenv.config()

app.use(cors({
//   origin: 'http://192.168.1.12:5173',
  origin: ["http://localhost:5173", "https://pronia-mziuri.onrender.com"],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser()); // to access cookies in node.js

//
app.use("/api/users", UsersRouter);
app.use("/api/products", ProductsRouter);

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



app.listen(PORT, ()=> {
    console.log(`Server successfully started on port - ${PORT}`);
    connectDB(process.env.MONGODB_CONNECT_URL, process.env.MOGNODB_CONNECT_NAME);
})