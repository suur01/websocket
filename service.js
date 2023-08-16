const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const totalterhubung = []

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    const receivedData = JSON.parse(message);

    // get total client yang terhubung
      let checkdataterhubung = totalterhubung.find(item => item === receivedData.userId);
      if (checkdataterhubung == undefined) {
        totalterhubung.push(receivedData.userId);
      }
      console.log("data terhubung")
      console.log(totalterhubung)
    
    // Include the nickname in the data
    const dataToBroadcast = { userId : receivedData.userId,nickname: receivedData.nickname, value: receivedData.value, totalUserTerhubung: totalterhubung.length};

    // Broadcast the data to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dataToBroadcast));
      }
    });
  });
});

server.listen(3000, () => {
  console.log('WebSocket server is listening on port 3000');
});
