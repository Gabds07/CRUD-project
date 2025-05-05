const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User.js');

require('dotenv').config();

const app = express();
app.use(express.json());


async function connectation() {
  await mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
    console.log('Connected to mongodb');
  }).catch(e => {
    console.log('Error by trying to connect to mongodb', e);
  });
}

app.post('/user', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(501).json({ error: 'Error by trying to create a new user.' });
  }
});

app.get('/user', async (req, res) => {
  const getUsers = await User.find();

  if (getUsers.length > 0) {
    res.json(getUsers);
  }

  if (getUsers.length === 0) return res.status(501).json({
    'error': 'Error: no registered user was found.'
  });
});

app.get('/', (req, res) => {
  res.send({
    "status": "Status ON",
  });
});

app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
  connectation();
});
