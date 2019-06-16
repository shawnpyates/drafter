const Sequelize = require('sequelize');
const { Player } = require('../models');

const { in: opIn } = Sequelize.Op;

module.exports = {

  async fetchOne(req, res) {
    try {
      const player = await Player.find({ where: { uuid: req.params.id } });
      return res.status(200).send({ player });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraft(req, res) {
    try {
      const { id: draftId } = req.params;
      const players = await Player.findAll({ where: { draftId } });
      return res.status(200).send({ players });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByTeam(req, res) {
    try {
      const { id: teamId } = req.params;
      const players = await Player.findAll({ where: { teamId } });
      return res.status(200).send({ players });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const {
        name,
        email,
        position,
        draftId,
        teamId,
        creatorUserId,
      } = req.body;

      const player = await Player.create({
        name,
        email,
        position,
        draftId,
        teamId,
        creatorUserId,
      });
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

      const player = await Player.find({ where: { uuid: req.params.id } });
      if (!player) return res.status(404).send({ e: 'Player not found.' });

      const updatedPlayer = await player.update({
        name: name || player.name,
        email: email || player.email,
        position: position || player.position,
        draftId: draftId || player.draftId,
        teamId: teamId || player.teamId,
      });
      return res.status(200).send({ player: updatedPlayer });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const player = await Player.find({ where: { uuid: req.params.id } });
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
