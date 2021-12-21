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
  console.log('incoming GET /recordings', req.rawHeaders);
  const listAllKeys = (params) => new Promise((resolve, reject) => {
    s3.listObjectsV2(params).promise()
      .then(({Contents}) => {
        const data = [];
        const s3URL = `https://${process.env.BUCKET}.s3.amazonaws.com/`
        for (let i in Contents) {
          data.push({
            audioURL: s3URL + Contents[i].Key,
            fileName: Contents[i].Key.substring(11),
          })
        }
        resolve(data);
      })
      .catch(reject);
  });
  
  listAllKeys({Bucket: process.env.BUCKET, Prefix: 'recordings/', Delimiter: '/'})
    .then((data) => res.send(data))
    .catch(console.log);

});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'unearth-voice-recorder',
    key: (req, file, cb) => {
        cb(null, 'recordings/' + file.originalname);
    },
  }),
});

const type = upload.single('wav');

app.post('/recording', type, (req, res) => {
  res.json({ url: req.file.location });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
