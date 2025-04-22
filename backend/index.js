import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const PORT = 2508;

dotenv.config()

app.use(express.json())

app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); // Allow any origin
    },    
    credentials: true // Allow cookies to be sent
}));


app.listen(PORT, ()=> {
    console.log(`Server successfully started on port - ${PORT}`);
})