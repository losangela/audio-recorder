const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/recordings', (req, res) => {
  res.json('Hello World!')
});

const upload = multer({ dest: __dirname + '/public/uploads/' });
const type = upload.single('wav');

app.post('/recording', type, (req, res) => {
  const { body, file } = req;
  console.log({body, file});
  res.json('i got your recording')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
