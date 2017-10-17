const Draft = require('../models').Draft

module.exports = {
  create(req, res) {
    return Draft.create({ name: req.body.name, timeScheduled: req.body.timeScheduled })
    .then(draft => res.status(201).send(draft))
    .catch(error => res.status(400).send(error))
  }
}