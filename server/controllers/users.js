const User = require('../models').User

module.exports = {

  retrieveOne(req, res) {
    return User.findById(req.params.id)
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
  },

  create(req, res) {
    return User.create({ 
      name: req.body.name, 
      registeredAsPlayer: req.body.registeredAsPlayer,
      position: req.body.position,
      teams: null
     })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
  },

  update(req, res) {
    return User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status.send({message: "User not found."})
      return user.update({
        registeredAsPlayer: req.body.registeredAsPlayer || user.registeredAsPlayer,
        position: req.body.position || user.position
      })
      .then(() => res.status(200).send(user))
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return User.findById(req.params.id)
    .then(user => {
      if (!user) return res.status.send({message: "User not found."})
      return user.destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))
  }
  
}