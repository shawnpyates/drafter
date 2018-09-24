const { User, Team, UserTeam } = require('../models');
const { getOrgsWithOwnerName } = require('./helpers');

module.exports = {

  async fetchUsersByTeam(req, res) {
    const { teamId } = req.params;
    try {
      const userTeams = await UserTeam.findAll({ where: { teamId }, include: [User] });
      const users = userTeams.map(ut => ut.User).filter(user => user.registeredAsPlayer);
      return res.status(200).send({ users });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchTeamsByUser(req, res) {
    try {
      const { userId } = req.params;
      const userTeams = await UserTeam.findAll({ where: { userId }, include: [Team] });
      if (!userTeams.length) return res.status(200).send({ teams: [] });
      const teamsWithOwnerName = await getOrgsWithOwnerName(userTeams, 'Team');
      return res.status(200).send({ teams: teamsWithOwnerName });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { isOwner, isAdmin } = req.body;
      const { teamId, userId } = req.params;
      const userTeam = await UserTeam.create({
        isOwner,
        isAdmin,
        teamId,
        userId,
      });
      // this function not always called as route handler, so validate that res exists
      if (res) return res.status(201).send({ userTeam });
    } catch (e) {
      if (res) return res.status(400).send({ e });
    }
    return null;
  },

  async destroy(req, res) {
    try {
      const { teamId, userId } = req.params;
      const userTeam = await UserTeam.find({ where: { teamId, userId } });
      if (!userTeam) return res.status(404).send({ e: 'Relationship not found ' });
      return res.status(204).send({});
    } catch (e) {
      if (res) return res.status(400).send({ e });
    }
    return null;
  },
};
