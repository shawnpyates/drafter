const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

module.exports = {

  async fetchOne(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.status(200).send({ user });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const {
        password,
        firstName,
        lastName,
        email,
      } = req.body;

      const hash = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
      });
      return res.status(201).send({ user });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).send({ failure: 'cannotFindUser' });

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) return res.status(401).send({ failure: 'incorrectPassword' });

      const token = { token: jwt.sign({ userId: user.id }, SECRET) };
      return res.status(201).send({ user, token });
    } catch (e) {
      return res.status(400).send({ failure: 'unexpected' });
    }
  },

  async update(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;

      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ e: 'User not found.' });

      const updatedUser = await user.update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: password || user.password,
      });
      return res.status(200).send({ user: updatedUser });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ e: 'User not found.' });
      await user.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
