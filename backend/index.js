import express from 'express';
import connectDB from './config/dataBase.js'
import cors from 'cors';
import router from "./routes/index.js";
import cookieParser from 'cookie-parser';
import msgRoute from './routes/msgRoute.js';
import {app, server} from './socket/socket.js';
import dotenv from 'dotenv';


dotenv.config({});



// const app = express();
const Port = process.env.PORT || 9000;



app.use(express.json({ limit: '10mb' })); // Increase JSON body size
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase form data size
 

const corsOptions = {
origin: process.env.FRONTEND_URL,
credentials : true,  //ye cookie ko allow karta hai// 
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());




// app.use('/', router )
app.use('/api', router)
app.use('/api/message', msgRoute)



server.listen(Port, ()=>{
    connectDB()
    console.log(`Server is lister on port ${Port}`)
})






