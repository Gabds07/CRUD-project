const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
  console.log('Connected to mongodb');
}).catch(e => {
  console.log('Error by trying to connect to mongodb', e);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
