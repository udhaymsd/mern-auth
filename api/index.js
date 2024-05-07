import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config()

// console.log("MONGO URI:", process.env.MONGO);
// console.log("JWT SECRET:", process.env.JWT_SECRET);



mongoose.connect(process.env.MONGO).then (() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err)
});


const app = express()

app.use(express.json())

app.listen(3000, () => { 
    console.log('Server is running on port  3000 !')
});


app.use('/api/user', userRoutes); // defaul name is userRouter
app.use('/api/auth', authRoutes);


//error handler

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message  || "Internal Server Error";
    return res.status(statusCode).json( {
        success: false,
        message,
        statusCode
    });
}); 
