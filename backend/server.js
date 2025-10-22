import { Server } from 'socket.io';
import http from "http";
import { reqType } from "./requestHandler.js";
const HOST = 'localhost';
const PORT = 8000;

const server = http.createServer((req, res) => {
    const request = new reqType(req);
    console.log(request.url.pathname)
    
    if (request.verb == "GET") {

    }


    if (request.verb == "POST") {
    }

})
const io = new Server(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('userData' , (data) =>{
    console.log(data);// store in a dataase
  })
socket.on('createRoom' ,(userData)=>{
  socket.join(userData)
  console.log(socket.id + "connected to" + userData);
});
socket.on('joinRoom',(userData)=>{
    socket.join(userData)
  console.log(socket.id + "connected to" + userData);
})

});

server.listen(PORT, HOST, () => {
    console.log(`HTTP Server listening on http://${HOST}:${PORT}/login/google`);
})