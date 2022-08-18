
const express = require('express');
const app = express();
const path = require('path')

const http = require('http').createServer(app);

const PORT = process.env.PORT || 8080;

http.listen(PORT,()=>console.log(`server responding on http://localhost:${PORT}`));
app.use(express.static(__dirname +'/public'))
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'index.html'));
})

const users = {};
// establishing connection of socket io
const { Server } = require("socket.io");

const io = new Server(http);

io.on('connection', (socket) => {

     console.log('a user connected');


     socket.on('new-user-joined', name =>{

        console.log(`${name} just joined the chat`);
        
       users[socket.id]= name;
       socket.broadcast.emit('user-joined',name)
     });

     socket.on('send', message=>{
        socket.broadcast.emit('receive',{'message':message,'user':users[socket.id]})
     });

     console.log("everything goes well...");

  });


