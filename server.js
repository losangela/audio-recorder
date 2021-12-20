const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  
  if (url === '/file' && method === 'POST') {
    req.on('data', (data) => {
      // save .wav file
    })
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server running at ${port}/`);
});