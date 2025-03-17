import express from "express";
const app = express();
import rateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser";
import cors from 'cors';

const limiter = rateLimit({
  // only 100 request in 1 hours
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})

// app.use('/api',limiter);

import dotenv from "dotenv";
dotenv.config();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, POST, GET, PATCH , patch, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  next();
}); 

app.use(express.json());
app.use(express.static('public'));

// Cookie parser middleware
app.use(cookieParser());

// upload img 
app.use('/uploads', express.static('uploads'))

import itmersRouter from './routers/itemsRouters.js';
app.use('/', itmersRouter);

import orderRouter from './routers/orderRouter.js';
app.use('/', orderRouter);

import auth from './routers/authRouters.js';
app.use('/', auth);

import user from './routers/userRouter.js';
app.use('/', user);

import comment from './routers/commentRouters.js';
app.use('/', comment);

app.use('*', (req, res, next) => {
  res.status(404).json({errMessage: `Can't find this route ${req.originalUrl} `});
})

export default app;
