const Draft = require('../models').Draft

module.exports = {

  retrieve(req, res) {
    return Draft.findAll()
    .then(drafts => res.status(201).send(drafts))
    .error(error => res.status(400).send(error))
  },

  retrieveOne(req, res) {
    return Draft.findById(req.params.id)
    .then(draft => res.status(201).send(draft))
    .catch(error => res.status(400).send(error))
  },

  create(req, res) {
    return Draft.create({ name: req.body.name, timeScheduled: req.body.timeScheduled })
    .then(draft => res.status(201).send(draft))
    .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    return Draft.findById(req.params.id)
    .then(draft => {
      if (!draft) return res.status.send({message: "Draft not found."})
      return Draft.update({
        name: req.body.name || draft.name,
        timeScheduled: req.body.timeScheduled || draft.timeScheduled
      })
      .then(() => res.status(200).send(draft))
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return Draft.findById(req.params.id)
    .then(draft => {
      if (!draft) return res.status.send({message: "Draft not found."})
      return Draft.destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error))
    })
  }
  
}