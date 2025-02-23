import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user.router.js';
import authRouter from './router/auth.router.js';
import trainRouter from './router/train.router.js';
import cookieParser from 'cookie-parser';
import cleanupExpiredBookings from './utils/bookingCleanup.js';
import deletePendingBookings from './utils/deletePendingBookings.js';
import path from 'path';

dotenv.config();

mongoose
    .connect(process.env.MONGO, {
        serverSelectionTimeoutMS: 100000,
        socketTimeoutMS: 120000,
        connectTimeoutMS: 120000
    })
    .then(() => {
        console.log('Connected to MongoDB');
        cleanupExpiredBookings();
        deletePendingBookings();
    })
    .catch((err) => console.log(`Mongo connection error: ${err}`));

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/train', trainRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

process.on("SIGTERM", () => {
    console.log("Closing server...");
    server.close(() => process.exit(0));
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});
