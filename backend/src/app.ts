import express, { Request, Response } from 'express';
import cors from 'cors';
const tasks = require('./routes/routes');
const app = express();

const PORT = 5000;


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
}))

app.use(express.json())

app.use('/tasks', tasks)


const start = () => {
    try {
        app.listen(PORT, () => console.log(`Running on port ${PORT}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()