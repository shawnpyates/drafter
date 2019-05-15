const { Team } = require('../models');
const { create: createUserTeam } = require('./userTeams');

module.exports = {
  async fetchOne(req, res) {
    try {
      const team = await Team.findById(req.params.id);
      return res.status(200).send({ team });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { name, ownerUserId, draftId } = req.body;
      const team = await Team.create({ name, ownerUserId, draftId });
      const teamProperties = {
        body: {
          isOwner: true,
          isAdmin: true,
        },
        params: {
          teamId: team.id,
          userId: ownerUserId,
        },
      };
      await createUserTeam(teamProperties);
      return res.status(201).send({ team });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).send({ e: 'Team not found.' });
      const updatedTeam = await team.update({ name: req.body.name || team.name });
      return res.status(200).send({ team: updatedTeam });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const team = await Team.findById(req.params.id);
      if (!team) return res.status(404).send({ e: 'Team not found.' });
      await team.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
