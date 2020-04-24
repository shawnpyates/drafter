const bcrypt = require('bcrypt');
const {
  Draft,
  Player,
  Request,
  Session,
  Team,
  User,
} = require('../models');

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
            include: [Draft, User],
          },
          User,
        ],
      },
      {
        model: Team,
        include: [
          {
            model: Draft,
            include: [User],
          },
          Player,
          User,
        ],
      },
      {
        model: Request,
        include: [Draft],
      },
    ],
    order: [
      [Team, 'createdAt', 'asc'],
      [Draft, 'createdAt', 'asc'],
      [Request, 'createdAt', 'asc'],
    ],
  });
  return user;
};

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

  async fetchCurrent(req, res) {
    try {
      const session = await Session.findOne({ where: { uuid: req.session.id } });
      const user = await fetchUserQuery({ uuid: session.userId });
      return res.status(200).send({ user });
    } catch (e) {
      return res.status(400).send({ e: e.message });
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

      const { uuid: userId } = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        token: req.session.id,
      });
      await Session.create({ uuid: req.session.id, userId });
      // 'include' param seems to not work on create method, use refetch for now
      const userWithAssociations = await fetchUserQuery({ uuid: userId });
      req.session.user = userWithAssociations;
      return res.status(201).send({ user: userWithAssociations });
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

      await Session.create({ uuid: req.session.id, userId: user.uuid });
      return res.status(201).send({ user });
    } catch (e) {
      return res.status(400).send({ failure: 'unexpected' });
    }
  },

  async logout(req, res) {
    try {
      if (req.session) {
        const session = await Session.findOne({ where: { uuid: req.session.id } });
        await session.destroy();
        await req.session.destroy();
      }
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        oldPassword,
        newPasswordFirstInsertion: newPassword,
      } = req.body;

      const user = await User.findOne({ where: { uuid: req.params.id } });
      if (!user) return res.status(404).send({ e: 'User not found.' });

      let hash;
      if (newPassword) {
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect) return res.status(401).send({ failure: 'incorrectPassword' });
        hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
      }

      const updatedUser = await user.update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: hash || user.password,
      });
      const updatedUserWithAssociations = await fetchUserQuery({ uuid: updatedUser.uuid });
      return res.status(200).send({ user: updatedUserWithAssociations });
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
