require('dotenv').config();
const express = require('express');
const aws = require('aws-sdk');
const cors = require('cors');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();
const s3 = new aws.S3();
const port = 3000;

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

// this request retrieves all .wav recordings in the s3 bucket
app.get('/recordings', (req, res) => {

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
    bucket: process.env.BUCKET,
    key: (req, file, cb) => {
        cb(null, 'recordings/' + file.originalname);
    },
  }),
});

const type = upload.single('wav');

// this request uploads a .wav recording to the s3 bucket
app.post('/recording', type, (req, res) => {
  res.json({ url: req.file.location });
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
});
