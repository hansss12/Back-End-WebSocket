Sebelumnya, perlu diketahui bahwa penggunaan WebSocket biasanya tidak ditujukan untuk pengambilan data dari API HTTP biasa. Fungsinya lebih kepada mendukung komunikasi dua arah antara server dan client secara real-time. Fetching data dari API setiap beberapa menit biasanya dilakukan dengan teknik polling menggunakan AJAX atau fetch API.

Namun, untuk skenario di mana Anda ingin menggunakan WebSocket untuk mengambil data setiap 3 menit, berikut adalah contoh kode yang bisa digunakan. Dalam contoh ini, saya menggunakan JavaScript dan Node.js dengan library 'ws' untuk WebSocket:

```js
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
```

Pastikan untuk mengganti 'wss://your-websocket-endpoint' dengan alamat endpoint WebSocket yang sesuai. Harap dicatat bahwa kode di atas mengasumsikan bahwa Anda memiliki server WebSocket yang dapat menerima dan memproses data yang dikirim. Anda harus menyesuaikan kode ini sesuai dengan setup Anda.

Dan sebagai penjelasan tambahan, penggunaan WebSocket untuk keperluan ini (pengambilan data dari API setiap interval waktu tertentu) mungkin bukan pendekatan yang paling efisien atau tepat. WebSocket biasanya digunakan ketika Anda perlu komunikasi real-time dan dua arah antara client dan server. Jika Anda hanya perlu mengambil data dari API setiap beberapa menit, teknik polling biasa mungkin lebih sesuai.