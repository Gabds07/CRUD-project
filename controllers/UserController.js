const User = require('../models/User.js');
const validator = require('email-validator');

module.exports = {
  async usersVerifier(req, res) {
    try {
      const getUsers = await User.find();

      if (getUsers.length > 0) return res.status(201).json(getUsers);
      if (getUsers.length === 0) return res.status(404).json({ error: 'No users found.' });
    } catch {
      res.status(501).json({ error: 'Error by trying to find users.' });
    }
  },

  async userDataverifier(req, res) {
    try {
      const { name, email } = req.body;
      let newUser = { name, email };

      if (validator.validate(newUser.email)) {
        newUser = await User.create({ name, email });
        return res.status(201).json(newUser);
      }
      if (!validator.validate(newUser.email)) res.status(404).json({ error: 'E-mail is invalid.' });
    } catch {
      res.status(501).json({ error: 'Error by trying to create a new user.' });
    }
  }
};
