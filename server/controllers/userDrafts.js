const { User, Draft, UserDraft } = require('../models');

module.exports = {

  async fetchUsersByDraft(req, res) {
    const { draftId } = req.params;
    try {
      const userDrafts = await UserDraft.findAll({ where: { draftId }, include: [User] });
      const users = userDrafts.map(ud => ud.User).filter(user => user.registeredAsPlayer);
      return res.status(200).send({ users });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchDraftsByUser(req, res) {
    try {
      const { userId } = req.params;
      const userDrafts = await UserDraft.findAll({
        where: { userId },
        include: [{
          model: Draft,
          include: [User],
        }],
      });
      const drafts = userDrafts.map(ud => ud.Draft);
      if (!drafts.length) return res.status(200).send({ drafts: [] });
      return res.status(200).send({ drafts });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { isOwner, isAdmin } = req.body;
      const { draftId, userId } = req.params;
      const userDraft = await UserDraft.create({
        isOwner,
        isAdmin,
        draftId,
        userId,
      });
      // this function not always called as route handler, so validate that res exists
      if (res) return res.status(201).send({ userDraft });
    } catch (e) {
      if (res) return res.status(400).send({ e });
    }
    return null;
  },

  async destroy(req, res) {
    try {
      const { draftId, userId } = req.params;
      const userDraft = await UserDraft.findOne({ where: { draftId, userId } });
      if (!userDraft) return res.status(404).send({ e: 'Relationship not found.' });
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
