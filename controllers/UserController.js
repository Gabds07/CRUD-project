const User = require('../models/User.js');
const validator = require('email-validator');

module.exports = {
  async getUsersData(req, res) {
    try {
      const getUsers = await User.find();

      if (getUsers.length > 0) return res.status(201).json(getUsers);
      if (getUsers.length === 0) return res.status(400).json({ error: 'User was not found.' });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Error by trying to find users.' });
    }
  },

  async getUsersById(req, res) {
    try {
      const { _id } = req.params;
      const getUserById = await User.findById(_id);

      if(!getUserById) return res.status(404).json({error: 'User was not found'});

      res.status(201).json(getUserById);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Error by trying to find user by Id.' });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email } = req.body;
      let newUser = { name, email };

      if (newUser.name.length < 3 || newUser.name.length > 20) return res.status(400).json({ error: 'The name must have between 3 and 20 caractheres' });
      else if (!validator.validate(newUser.email)) return res.status(400).json({ error: 'E-mail is invalid.' });

      newUser = await User.create({ name, email });
      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Error by trying to create a new user.' });
    }
  },

  async editUser(req, res) {
    try {
      const { _id } = req.params;
      const { name, email } = req.body;
      let editedUser = { name, email };

      if (editedUser.name.length < 3 || editedUser.name.length > 20) return res.status(400).json({ error: 'The name must have between 3 and 20 caractheres' });
      else if (!validator.validate(editedUser.email)) return res.status(400).json({ error: 'E-mail is invalid.' });

      editedUser = await User.findByIdAndUpdate(_id, { name, email }, { new: true });

      return res.status(201).json(editedUser);
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Error by trying to edit/find this user.' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { _id } = req.params;

      const userDeleted = await User.findByIdAndDelete(_id);

      if (!userDeleted) {
        return res.status(400).json({ message: 'User was not found' });
      }

      return res.json({ message: 'User deleted with success' });
    } catch (err) {
      console.log(err);
      return res.status(501).json({ error: 'Error by trying to delete this user.' });
    }
  }
};
