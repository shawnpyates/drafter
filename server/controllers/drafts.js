import { Draft } from '../models';
import { create as createUserDraft } from './userDrafts';

module.exports = {

  retrieve(req, res) {
    return Draft.findAll()
      .then(drafts => res.status(201).send(drafts))
      .error(error => res.status(400).send(error));
  },

  retrieveOne(req, res) {
    return Draft.findById(req.params.id)
      .then(draft => res.status(201).send(draft))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const { name, timeScheduled, creatorId } = req.body;
    return Draft.create({ name, timeScheduled })
      .then((draft) => {
        res.status(201).send(draft);
        const mockReqObj = {
          body: {
            isAdmin: true,
          },
          params: {
            draftId: draft.id,
            userId: creatorId,
          },
        };
        createUserDraft(mockReqObj);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    const { name, timeScheduled } = req.body;
    return Draft.findById(req.params.id)
      .then((draft) => {
        if (!draft) return res.status.send({ message: 'Draft not found.' });
        return draft.update({
          name: name || draft.name,
          timeScheduled: timeScheduled || draft.timeScheduled,
        })
          .then(() => res.status(200).send(draft))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Draft.findById(req.params.id)
      .then((draft) => {
        if (!draft) return res.status.send({ message: 'Draft not found.' });
        return Draft.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      });
  },
};
