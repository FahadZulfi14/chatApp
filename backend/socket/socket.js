// import {Server} from 'socket.io';
// import http from 'http';
// import express from 'express';



// const app = express();
// const server = http.createServer(app);

// const io = new Server(server,{
//     cors:{
//         origin:['http://localhost:5173'],
//         methods: ['GET','POST'],
//     },
// });


// export const getReceiverSocketId = (receiverId)=>{
// return userSocketMap[receiverId]
// };



// const userSocketMap = {};
// io.on('connection', (socket)=>{
//     console.log('User Connected', socket.id)

    

//     const userId = socket.handshake.query.userId;
//     if(userId !== undefined){
//         userSocketMap[userId] = socket.id;
//     }

//     io.emit('getOnlineUser', Object.keys(userSocketMap));

//     socket.on('disconnect', ()=>{
//         console.log('user Disconnected',socket.id)
//         delete userSocketMap[userId];
//         io.emit('getOnlineUser', Object.keys(userSocketMap))
//     })


// })


// export {app, io, server};





import {Server} from "socket.io";
import http from "http";
import express from "express";
import dotenv from 'dotenv';

const app = express();
dotenv.config({});


const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
        // origin:['https://chatapp-alpha-lilac.vercel.app'],
        // origin:[process.env.FRONTEND_URL],
        credentials : true,
        methods:['GET', 'POST'],

    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}
let userSocketMap = {}; // {userId->socketId}
    
    


io.on('connection', (socket)=>{
    console.log('User Connected', socket.id)

    
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 
    
    io.emit('getOnlineUser', Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        console.log('user Disconnected',socket.id)
        delete userSocketMap[userId];
        io.emit('getOnlineUser', Object.keys(userSocketMap));
    })

})

export {app, io, server};
