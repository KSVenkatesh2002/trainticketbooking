import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/user.router.js' 
import authRouter from './router/auth.router.js'
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(()=>console.log('connected to mongo'))
  .catch((err)=>console.log(`mongo error :${err}`))

export const app = express();

app.listen(3000 , ()=>{console.log("server is established")});
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use((err, req, res, next) => {
  const givennext = next;
  console.log(givennext)
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});