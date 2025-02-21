import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user.router.js'
import authRouter from './router/auth.router.js'
import trainRouter from './router/train.router.js'
import cookieParser from 'cookie-parser';
import cleanupExpiredBookings from './utils/bookingCleanup.js';
import deletePendingBookings from './utils/deletePendingBookings.js'
import path from 'path';
dotenv.config();

mongoose
    .connect(process.env.MONGO, {
        serverSelectionTimeoutMS: 100000,  // Increase to 100 seconds
        socketTimeoutMS: 120000,           // Increase to 120 seconds
        connectTimeoutMS: 120000            // Add connection timeout
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Mongo connection error: ${err}`));

// Start Cleanup Job
cleanupExpiredBookings();
deletePendingBookings();

// const __dirname = path.resolve();

export const app = express();

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

app.listen(3000, () => { 
    console.log("server is established") 
});

app.use(express.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/train',trainRouter)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});