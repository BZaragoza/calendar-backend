import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { dbConnection } from './db/config.js'

import authRoutes from './routes/auth.js'
import eventsRoutes from './routes/events.js'

const app = express();

// DB Connection
dbConnection();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Static files
app.use(express.static('public'))

// Routes definition
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes)




app.listen(process.env.PORT, () => {
  console.log(`Server on port ${ process.env.PORT }`)
})