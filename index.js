const express = require('express');
const mongoose = require('mongoose');
const UserController = require('./controllers/UserController.js');

require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/user', UserController.getUsersData);
app.get('/user/:_id', UserController.getUsersById);
app.post('/user', UserController.postData);
app.put('/user/:_id', UserController.editData);

mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
  console.log('Connected to mongodb');
}).catch(e => {
  console.log('Error by trying to connect to mongodb', e);
});

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
