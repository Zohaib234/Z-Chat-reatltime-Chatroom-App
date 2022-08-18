
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

// establishing connection of socket io
const { Server } = require("socket.io");
const io = new Server(http);
io.on('connection', (socket) => {
    console.log('a user connected');
  });


