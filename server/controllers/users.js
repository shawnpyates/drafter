const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  Draft,
  Player,
  Request,
  Team,
  User,
} = require('../models');

const SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

const fetchUserQuery = async (searchWhere) => {
  const user = await User.findOne({
    where: searchWhere,
    include: [
      {
        model: Draft,
        include: [
          {
            model: Request,
            include: [Draft, User]
          },
          User,
        ],
      },
      {
        model: Team,
        include: [Draft, Player, User],
      },
      {
        model: Request,
        include: [Draft],
      },
    ],
  });
  return user;
}

module.exports = {

  async fetchOne(req, res) {
    try {
      const { id } = req.params;
      const user = await fetchUserQuery({ uuid: id });
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
      const { uuid } = user;
      // 'include' param seems to not work on create method, use refetch for now
      const userWithAssociations = await fetchUserQuery({ uuid });
      const token = { token: jwt.sign({ userId: uuid }, SECRET) };
      return res.status(201).send({ user: userWithAssociations, token });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await fetchUserQuery({ email });
      if (!user) return res.status(404).send({ failure: 'cannotFindUser' });

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) return res.status(401).send({ failure: 'incorrectPassword' });

      const token = { token: jwt.sign({ userId: user.uuid }, SECRET) };
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

      const user = await User.findOne({ where: { uuid: req.params.id } });
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
      const user = await User.findOne({ where: { uuid: req.params.id } });
      if (!user) return res.status(404).send({ e: 'User not found.' });
      await user.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
