const UserDraft = require('../models').UserDraft

module.exports = {
  create(req, res) {
    return UserDraft.create({ 
      isAdmin: req.body.isAdmin, 
      draftId: req.params.draftId, 
      userId: req.params.userId 
    })
    .then(userDraft => res.status(201).send(userDraft))
    .catch(error => res.status(400).send(error))
  }
}