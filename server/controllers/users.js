import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const SECRET = process.env.JWT_SECRET;

module.exports = {

  async fetchOne(req, res) {
    try {
      const user = User.findById(req.params.id);
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
        registeredAsPlayer,
        position,
      } = req.body;
      const user = await bcrypt.genSalt(10, (err1, salt) => {
        bcrypt.hash(password, salt, (err2, hash) => (
          User.create({
            firstName,
            lastName,
            email,
            password: hash,
            registeredAsPlayer,
            position,
            teams: [],
            drafts: [],
          })
        ));
      });
      return res.status(201).send({ user });
    } catch (e) {
      return res.status(400).send(e);
    }
  },

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).send({ failure: 'cannotFindUser' });
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const claim = { userId: user.id };
          const token = { token: jwt.sign(claim, SECRET) };
          return res.status(201).send({ user, token });
        }
        return res.status(401).send({ failure: 'incorrectPassword' });
      });
    } catch (e) {
      return res.status(400).send({ failure: 'unexpected' });
    }
    return null;
  },

  async update(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        registeredAsPlayer,
        position,
      } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ e: 'User not found.' });
      const updatedUser = await user.update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: password || user.password,
        registeredAsPlayer: (
          typeof registeredAsPlayer === 'boolean' ? registeredAsPlayer : user.registeredAsPlayer
        ),
        position: registeredAsPlayer ? (position || user.position) : null,
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
