const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {

  retrieveOne(req, res) {
    return User.findById(req.params.id)
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
  },

  create(req, res) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        return User.create({ 
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash, 
          registeredAsPlayer: req.body.registeredAsPlayer,
          position: req.body.position,
          teams: null,
          drafts: null
         })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error))
      })
    })
  },

  authenticate(req, res) {
    User.findOne({ where: { email: req.body.email }})
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) {
          res.status(400).send(err)
        }
        if (response) {
          let claim = {userId: user.id}
          let token = {token: jwt.sign(claim, secret)}
          res.status(201).send({user: user, token: token})
        } else {
          res.status(400).send({failure: "incorrectPassword"})
        }
      })
    })
    .catch(error => {
      res.status(400).send({failure: "cannotFindUser"})
    })
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