const Sequelize = require('sequelize');
const { Player } = require('../models');

const { in: opIn } = Sequelize.Op;

module.exports = {

  async fetchOne(req, res) {
    try {
      const user = await Player.findById(req.params.id);
      return res.status(200).send({ user });
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
      } = req.body;

      const player = await Player.create({
        name,
        email,
        position,
        draftId,
        teamId,
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

      const player = await Player.findById(req.params.id);
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
      const player = await Player.findById(req.params.id);
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
      await Player.destroy({ where: { id: { [opIn]: ids } } });
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
