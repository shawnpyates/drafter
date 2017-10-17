const User = require('../models').User

module.exports = {
  create(req, res) {
    return User.create({ 
      name: req.body.name, 
      registeredAsPlayer: req.body.registeredAsPlayer,
      position: req.body.position,
      teamId: req.body.teamId,
      draftId: req.body.draftId
     })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
  }
}