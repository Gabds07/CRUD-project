const User = require('../models/User.js');
const validator = require('email-validator');

module.exports = {
  getUsersData(req, res) {
    async function usersVerifier() {
      try {
        const getUsers = await User.find();

        if (getUsers.length > 0) return res.status(201).json(getUsers);
        if (getUsers.length === 0) return res.status(404).json({ error: 'No users found.' });
      } catch {
        res.status(501).json({ error: 'Error by trying to find users.' });
      }
    }
    usersVerifier();
  },

  async getUsersById(req, res) {
    try {
      const { _id } = req.params;
      const getUserById = await User.findById(_id);

      res.status(201).json(getUserById);
    } catch {
      res.status(501).json({ error: 'Error by trying to find user by Id.' });
    }
  },

  postData(req, res) {
    async function userDataVerifier() {
      try {
        const { name, email } = req.body;
        let newUser = { name, email };

        if (newUser.name.length < 3 || newUser.name.length > 20) return res.status(404).json({ error: 'The name must have between 3 and 20 caractheres' });
        if (!validator.validate(newUser.email)) return res.status(404).json({ error: 'E-mail is invalid.' });

        if (validator.validate(newUser.email) && newUser.name.length >= 3 || newUser.name.length <= 20) {
          newUser = await User.create({ name, email });
          return res.status(201).json(newUser);
        }
      } catch {
        return res.status(501).json({ error: 'Error by trying to create a new user.' });
      }
    }
    userDataVerifier();
  }
};
