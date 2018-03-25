import Sequelize from 'sequelize';

import { User, Draft, UserDraft } from '../models';

const { in: opIn } = Sequelize.Op;

module.exports = {

  retrieveUsersByDraft(req, res) {
    UserDraft.findAll({ where: { draftId: req.params.draftId } })
      .then((userDrafts) => {
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
    const { isAdmin } = req.body;
    const { draftId, userId } = req.params;
    return UserDraft.create({ isAdmin, draftId, userId })
      .then((userDraft) => {
        User.findById(userDraft.userId)
          .then((user) => {
            Draft.findById(userDraft.draftId)
              .then((draft) => {
                user.drafts.push(draft.name);
                user.save().then(() => {
                  res.status(201).send(userDraft);
                })
                  .catch(error => res.status(400).send(error));
              });
          });
      })
      .catch(error => res.status(400).send(error));
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
