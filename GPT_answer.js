const WebSocket = require('ws');
const fetch = require('node-fetch');

const ws = new WebSocket('wss://your-websocket-endpoint');

async function fetchApiData() {
  const response = await fetch('https://livethreatmap.radware.com/api/map/attacks?limit=10');
  const data = await response.json();
  return data;
}

ws.on('open', function open() {
  setInterval(async () => {
    const data = await fetchApiData();
    ws.send(JSON.stringify(data));
  }, 180000); // Fetch data every 3 minutes
});

function callmeWebSocket() {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
}
