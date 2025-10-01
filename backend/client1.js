import { io } from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:8000');
   let data = "user123" ;
// Connection event handlers
socket.on('connect', () => {
    socket.emit("userData" , data);
    console.log('✅ Connected to server with ID:', socket.id);
    socket.emit("createRoom" , data);
});



