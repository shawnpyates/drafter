import Sequelize from 'sequelize';

import { User, Draft, UserDraft } from '../models';

const { in: opIn } = Sequelize.Op;

module.exports = {

  retrieveUsersByDraft(req, res) {
    UserDraft.findAll({ where: { draftId: req.params.draftId } })
      .then((userDrafts) => {
        if (!userDrafts.length) {
          res.status(201).send([]);
          return;
        }
        const userIds = userDrafts.map(ud => ud.userId);
        return User.findAll({
          where: {
            id: { [opIn]: userIds },
          },
        })
          .then(users => res.status(201).send(users))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveDraftsByUser(req, res) {
    UserDraft.findAll({ where: { userId: req.params.userId } })
      .then((userDrafts) => {
        const draftIds = userDrafts.map(ud => ud.draftId);
        return Draft.findAll({
          where: {
            id: { [opIn]: draftIds },
          },
        })
          .then(drafts => res.status(201).send(drafts))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const { isOwner, isAdmin } = req.body;
    const { draftId, userId } = req.params;
    return UserDraft.create({ isOwner, isAdmin, draftId, userId })
      .then((userDraft) => {
        if (res) res.status(201).send(userDraft)
      })
      .catch((error) => {
        if (res) res.status(400).send(error)
      });
  },

  destroy(req, res) {
    const { draftId, userId } = req.params;
    return UserDraft.find({ where: { draftId, userId } })
      .then((userDraft) => {
        if (!userDraft) return res.status.send({ message: 'Relationship not found.' });
        return userDraft.destroy()
          .then(() => res.status.send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
