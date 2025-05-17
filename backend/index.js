import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

// DB
import connectDB from './db/connection.js'

// Routes
import UsersRouter from './routes/users.routes.js'
import ResetTokensRouter from './routes/tokens.routes.js'

const app = express()
const PORT = 2508;

dotenv.config()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())
app.use(cookieParser()); // to access cookies in node.js

//
app.use("/api/users", UsersRouter);
app.use("/api/resetTokens", ResetTokensRouter);

//



app.listen(PORT, ()=> {
    console.log(`Server successfully started on port - ${PORT}`);
    connectDB(process.env.MONGODB_CONNECT_URL, process.env.MOGNODB_CONNECT_NAME);
})