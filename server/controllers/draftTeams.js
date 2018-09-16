const { Draft, Team, DraftTeam } = require('../models');

const { getOrgsWithOwnerName } = require('./commonUtils');

module.exports = {

  async fetchDraftsByTeam(req, res) {
    try {
      const { teamId } = req.params;
      const draftTeams = await DraftTeam.findAll({ where: { teamId }, include: [Draft] });
      if (!draftTeams.length) return res.status(200).send({ draftsWithOwnerName: [] });
      const draftsWithOwnerName = await getOrgsWithOwnerName(draftTeams, 'Draft');
      return res.status(200).send({ drafts: draftsWithOwnerName });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchTeamsByDraft(req, res) {
    try {
      const { draftId } = req.params;
      const draftTeams = await DraftTeam.findAll({ where: { draftId }, include: [Team] });
      if (!draftTeams.length) return res.status(200).send({ teamsWithOwnerName: [] });
      const teamsWithOwnerName = await getOrgsWithOwnerName(draftTeams, 'Team');
      return res.status(200).send({ teams: teamsWithOwnerName });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { draftId, teamId } = req.params;
      const draftTeam = await DraftTeam.create({ draftId, teamId });
      if (res) return res.status(201).send({ draftTeam });
    } catch (e) {
      if (res) return res.status(400).send({ e });
    }
    return null;
  },

  async destroy(req, res) {
    try {
      const { draftId, teamId } = req.params;
      const userDraft = await DraftTeam.find({ where: { draftId, teamId } });
      if (!userDraft) return res.status(404).send({ e: 'Relationship not found.' });
      await userDraft.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
