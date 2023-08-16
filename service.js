const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws,req) => {
  console.log('Client connected');
  let a = ws.id = req.headers['sec-websocket-key']; 
  console.log(a)

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    const receivedData = JSON.parse(message);
    
    
    // Broadcast the received data to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(receivedData));
      }
    });
  });
});

server.listen(3001, () => {
  console.log('WebSocket server is listening on port 3000');
});
