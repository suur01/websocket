const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Queue numbers for different types
const queueNumbers = {
  A: 1,
  B: 1,
};

wss.on('connection', (ws) => {
console.log('Client connected');

    /* default data */

        //data yang di dikirim ke client
        const dt = {informasi: 'default data', a:queueNumbers.A,b:queueNumbers.B}

        // Broadcast the data to all connected clients
        wss.clients.forEach(client => {
            client.send(JSON.stringify(dt));
        });

    /* default data */

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        const messageString = message.toString();

        if (messageString.startsWith('requestQueue')) {
            const type = messageString.split(' ')[1]; // Extract queue type
            const queueNumber = getQueueNumber(type);
            const response = generateResponse(type, queueNumber);

            //data yang di dikirim ke client
            const dt = {informasi: response, a:queueNumbers.A,b:queueNumbers.B}

            // Broadcast the data to all connected clients
            wss.clients.forEach(client => {
                client.send(JSON.stringify(dt));
            });

        }

        

    });
})

function getQueueNumber(type) {
  const number = queueNumbers[type];
  console.log(number)
  queueNumbers[type] += 1;
  return number;
}

function generateResponse(type, queueNumber) {
  if (type === 'A') {
    return `Your queue number for type A: A${queueNumber}`;
  } else if (type === 'B') {
    return `Your queue number for type B: B${queueNumber}`;
  } else {
    return 'Invalid queue type';
  }
}

const port = 30001

server.listen(port, () => {
  console.log(`WebSocket server is listening on port ${port}`);
});
