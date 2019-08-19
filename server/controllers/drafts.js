const { Draft, User } = require('../models');
const { create: createUserDraft } = require('./userDrafts');

module.exports = {

  async fetchOne(req, res) {
    try {
      const draft = await Draft.findOne({
        where: { uuid: req.params.id },
        include: [User],
      });
      return res.status(200).send({ draft });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByOwner(req, res) {
    try {
      const { ownerUserId } = req.params;
      const drafts = await Draft.findAll({ ownerUserId });
      if (!drafts.length) return res.status(200).send({ drafts: [] });
      return res.status(200).send({ drafts });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { name, timeScheduled, ownerUserId } = req.body;
      const draft = await Draft.create({
        name,
        timeScheduled,
        ownerUserId,
        status: timeScheduled ? 'scheduled' : 'unscheduled',
      });
      const draftProperties = {
        body: {
          isOwner: true,
          isAdmin: true,
        },
        params: {
          draftId: draft.uuid,
          userId: ownerUserId,
        },
      };
      await createUserDraft(draftProperties);
      return res.status(201).send({ draft });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const { name, status, timeScheduled } = req.body;
      const draft = await Draft.findOne({ where: { uuid: req.params.id } });
      if (!draft) return res.status(404).send({ e: 'Draft not found.' });
      const updatedDraft = await draft.update({
        name: name || draft.name,
        status: status || draft.status,
        timeScheduled: timeScheduled || draft.timeScheduled,
      });
      return res.status(200).send({ draft: updatedDraft });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const draft = await Draft.findOne({ where: { uuid: req.params.id } });
      if (!draft) return res.status(404).send({ e: 'Draft not found.' });
      await draft.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
