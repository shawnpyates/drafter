const {
  Draft,
  Team,
  User,
  Player,
  Request,
} = require('../models');
const { create: createUserDraft } = require('./userDrafts');

const SELECTION_TIME_ALLOWANCE = 5 * 60 * 1000; // five minutes

const getSelectingTeamTimeChange = () => new Date(Date.now() + SELECTION_TIME_ALLOWANCE);

module.exports = {

  async fetchOne(req, res) {
    try {
      const draft = await Draft.findOne({
        where: { uuid: req.params.id },
        include: [
          {
            model: Team,
            include: [Draft, Player, User],
          },
          {
            model: Request,
            include: [Draft, User],
          },
          Player,
          User,
        ],
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
      const {
        name,
        currentlySelectingTeamId,
        status,
        timeScheduled,
      } = req.body;
      const draft = await Draft.findOne({
        where: { uuid: req.params.id },
        include: [Team, Player],
      });
      if (!draft) return res.status(404).send({ e: 'Draft not found.' });
      const selectingTeamChangeTime = (
        (status === 'open' || currentlySelectingTeamId)
        && getSelectingTeamTimeChange()
      );
      const updatedDraft = await draft.update({
        currentlySelectingTeamId: currentlySelectingTeamId || draft.currentlySelectingTeamId,
        name: name || draft.name,
        status: status || draft.status,
        timeScheduled: timeScheduled || draft.timeScheduled,
        selectingTeamChangeTime: selectingTeamChangeTime || draft.selectingTeamChangeTime,
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

  getSelectingTeamTimeChange,
};
