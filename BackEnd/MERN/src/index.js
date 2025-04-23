import express from 'express';
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../routes/auth.route.js';

dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.VITE_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
    connectDB();
});
