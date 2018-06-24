import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const SECRET = process.env.JWT_SECRET;

module.exports = {

  retrieveOne(req, res) {
    return User.findById(req.params.id)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const {
      password,
      firstName,
      lastName,
      email,
      registeredAsPlayer,
      position,
    } = req.body;
    bcrypt.genSalt(10, (err1, salt) => {
      bcrypt.hash(password, salt, (hashError, hash) => (
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
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error))
      ));
    });
  },

  authenticate(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.status(400).send(err);
          }
          if (response) {
            const claim = { userId: user.id };
            const token = { token: jwt.sign(claim, SECRET) };
            res.status(201).send({ user, token });
          } else {
            res.status(400).send({ failure: 'incorrectPassword' });
          }
        });
      })
      .catch(() => {
        res.status(400).send({ failure: 'cannotFindUser' });
      });
  },

  update(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      registeredAsPlayer,
      position,
    } = req.body;
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(400).send({ message: 'User not found.' });
        return user.update({
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          email: email || user.email,
          password: password || user.password,
          registeredAsPlayer: (
            typeof registeredAsPlayer === 'boolean' ? registeredAsPlayer : user.registeredAsPlayer
          ),
          position: registeredAsPlayer ? (position || user.position) : null,
        })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status.send({ message: 'User not found.' });
        return user.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
