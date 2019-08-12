const {
  Team,
  Draft,
  Player,
  User,
} = require('../models');
const { create: createUserTeam } = require('./userTeams');
const { create: createUserDraft } = require('./userDrafts');

module.exports = {
  async fetchOne(req, res) {
    try {
      const team = await Team.findOne({
        where: { uuid: req.params.id },
        include: [User],
      });
      return res.status(200).send({ team });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraft(req, res) {
    const { id: draftId } = req.params;
    try {
      const teams = await Team.findAll({
        where: { draftId },
        include: [Draft, User, Player],
      });
      if (!teams.length) return res.status(200).send({ teams: [] });
      return res.status(200).send({ teams });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { name, ownerUserId, draftId } = req.body;
      const team = await Team.create({ name, ownerUserId, draftId });
      const draft = await Draft.findOne({ where: { uuid: draftId } });
      const isTeamOwnerAlsoDraftOwner = draft.ownerUserId === ownerUserId;
      const userTeamProperties = {
        body: {
          isOwner: true,
          isAdmin: true,
        },
        params: {
          teamId: team.uuid,
          userId: ownerUserId,
        },
      };
      const userDraftProperties = {
        body: {
          isOwner: isTeamOwnerAlsoDraftOwner,
          isAdmin: isTeamOwnerAlsoDraftOwner,
        },
        params: {
          draftId,
          userId: ownerUserId,
        },
      };

      await createUserTeam(userTeamProperties);
      await createUserDraft(userDraftProperties);
      return res.status(201).send({ team });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const team = await Team.findOne({ where: { uuid: req.params.id } });
      if (!team) return res.status(404).send({ e: 'Team not found.' });
      const updatedTeam = await team.update({ name: req.body.name || team.name });
      return res.status(200).send({ team: updatedTeam });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const team = await Team.findOne({ where: { uuid: req.params.id } });
      if (!team) return res.status(404).send({ e: 'Team not found.' });
      await team.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
