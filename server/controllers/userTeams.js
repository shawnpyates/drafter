const UserTeam = require('../models').UserTeam

module.exports = {
  create(req, res) {
    return UserTeam.create({ 
      isAdmin: req.body.isAdmin, 
      teamId: req.params.teamId, 
      userId: req.params.userId 
    })
    .then(userTeam => res.status(201).send(userTeam))
    .catch(error => res.status(400).send(error))
  }
}