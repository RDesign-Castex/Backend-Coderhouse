const app = require('./app');
const http = require('http');
const socketIO = require('socket.io');


const port = process.env.PORT || 8080;

// Crear el servidor HTTP
const server = http.createServer(app);

// Inicializar Socket.IO
const io = socketIO(server);
app.set('socketio', io);



server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
