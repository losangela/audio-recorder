require('dotenv').config();
const express = require('express');
const aws = require('aws-sdk');
const cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();
const s3 = new aws.S3();
const port = 4000;

app.use(cors());
app.use(express.json());

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-west-1'
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/recordings', (req, res) => {
  res.json('Hello World!')
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'unearth-voice-recorder',
    key: (req, file, cb) => {
        console.log({s3Multer: file});
        cb(null, file.originalname); //use Date.now() for unique file keys
    },
  }),
});

const type = upload.single('wav');

app.post('/recording', type, (req, res) => {
  const { body, file } = req;
  console.log({body, file});
  res.json('i got your recording')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
