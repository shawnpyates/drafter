const Team = require('../models').Team

module.exports = {
  create(req, res) {
    return Team.create({ name: req.body.name, draftId: req.params.draftId })
    .then(team => res.status(201).send(team))
    .catch(error => res.status(400).send(error))
  }
}