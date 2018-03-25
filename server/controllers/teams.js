import { Team } from '../models';

module.exports = {

  retrieve(req, res) {
    const { draftId } = req.params;
    return Team.findAll({ where: { draftId } })
      .then(teams => res.status(201).send(teams))
      .catch(error => res.status(400).send(error));
  },

  retrieveOne(req, res) {
    return Team.findById(req.params.id)
      .then(team => res.status(201).send(team))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const { name } = req.body;
    const { draftId } = req.params;
    return Team.create({ name, draftId })
      .then(team => res.status(201).send(team))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Team.findById(req.params.id)
      .then((team) => {
        if (!team) return res.status.send({ message: 'Team not found.' });
        return team.update({
          name: req.body.name || team.name,
        })
          .then(() => res.status(200).send(team))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return Team.findById(req.params.id)
      .then((team) => {
        if (!team) return res.status.send({ message: 'Team not found.' });
        return team.destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
