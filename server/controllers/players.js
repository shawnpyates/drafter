const Sequelize = require('sequelize');
const { Player, Draft, Team } = require('../models');
const { getSelectingTeamTimeChange } = require('./drafts');

const { in: opIn } = Sequelize.Op;

const moveSelectionToNextTeam = async (draft, playerId) => {
  const { Players: players, Teams: teams, currentlySelectingTeamId } = draft;
  const playersWithoutTeamId = players.filter(player => !player.teamId);
  if (playersWithoutTeamId.length === 1 && playersWithoutTeamId[0].uuid === playerId) {
    await draft.update({
      status: 'closed',
      currentlySelectingTeamId: null,
      selectingTeamChangeTime: null,
    });
    return null;
  }
  const orderOfSelectingTeam = (
    teams.find(team => team.uuid === currentlySelectingTeamId).selectionorder
  );

  const nextTeam = (
    teams.find(team =>
      team.selectionorder === (
        orderOfSelectingTeam === teams.length
          ? 1
          : orderOfSelectingTeam + 1
      ))
  );

  const selectingTeamChangeTime = getSelectingTeamTimeChange();
  await draft.update({
    currentlySelectingTeamId: nextTeam.uuid,
    selectingTeamChangeTime,
  });
  return null;
};

module.exports = {

  async fetchOne(req, res) {
    try {
      const player = await Player.findOne({
        where: { uuid: req.params.id },
        include: [Draft, Team],
      });
      return res.status(200).send({ player });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraft(req, res) {
    try {
      const { id: draftId } = req.params;
      const players = await Player.findAll({ where: { draftId }, order: [['createdAt', 'asc']] });
      return res.status(200).send({ players });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByTeam(req, res) {
    try {
      const { id: teamId } = req.params;
      const players = await Player.findAll({ where: { teamId }, order: [['createdAt', 'asc']] });
      return res.status(200).send({ players });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { body } = req;
      if (Array.isArray(body)) {
        await Player.bulkCreate(body);
      } else {
        await Player.create({ ...body });
      }
      return res.status(201).send({ success: true });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async createMany(req, res) {
    try {
      const { body } = req;
      const player = await Player.bulkCreate(body);
      return res.status(201).send({ player });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const {
        name,
        email,
        position,
        draftId,
        teamId,
      } = req.body;

      const player = await Player.findOne({
        where: { uuid: req.params.id },
        include: [
          {
            model: Draft,
            include: [Player, Team],
          },
        ],
      });
      if (!player) return res.status(404).send({ e: 'Player not found.' });

      const updatedPlayer = await player.update({
        name: name || player.name,
        email: email || player.email,
        position: position || player.position,
        draftId: draftId || player.draftId,
        teamId: teamId || player.teamId,
      });
      if (teamId) {
        await moveSelectionToNextTeam(updatedPlayer.Draft, updatedPlayer.uuid);
      }
      return res.status(200).send({ player: updatedPlayer });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const player = await Player.findOne({ where: { uuid: req.params.id } });
      if (!player) return res.status(404).send({ e: 'Player not found.' });
      await player.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroyMany(req, res) {
    try {
      const { ids } = req.body;
      await Player.destroy({ where: { uuid: { [opIn]: ids } } });
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};

/*
Name	Draft	Owner	Selection Order
Griffins	Vancouver Rec League Draft	Shawn Yates	1
Penguins	Vancouver Rec League Draft	Shawn Yates	2
Dragons	Vancouver Rec League Draft	Shawn Yates	3
Owls	Vancouver Rec League Draft	Shawn Yates	4
Dolphins	Vancouver Rec League Draft	Shawn Yates	5
Ghosts	Vancouver Rec League Draft	Shawn Yates	6
Sharks	Vancouver Rec League Draft	Shawn Yates	7
Bears	Vancouver Rec League Draft	Shawn Yates	8
Warlocks	Vancouver Rec League Draft	Shawn Yates	9
Wolves	Vancouver Rec League Draft	Shawn Yates	10
Ogres	Vancouver Rec League Draft	Shawn Yates	11
Tigers	Vancouver Rec League Draft	Shawn Yates	12
*/