const UserTeam = require('../models').UserTeam
const User = require('../models').User
const Team = require('../models').Team

module.exports = {
  
  retrieveUsersByTeam(req, res) {
    return UserTeam.find({ where: { teamId: req.params.teamId} })
    .then(userTeam => {
      return User.findById(userTeam.userId)
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error))
    })
  },

  create(req, res) {
    return UserTeam.create({ 
      isAdmin: req.body.isAdmin, 
      teamId: req.params.teamId, 
      userId: req.params.userId 
    })
    .then(userTeam => {
      User.findById(userTeam.userId)
      .then(user => {
        Team.findById(userTeam.teamId)
        .then(team => {
          if (user.teams) {
            user.teams.push(team.name)
          } else {
            user.teams = [team.name]
          }
          user.save().then(() => {
            res.status(201).send(userTeam)
          })
          .catch(error => res.status(400).send(error))
        })
      })
    })
    .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return UserTeam.find({ where: { 
      teamId: req.params.teamId,
      userId: req.params.userId 
    }})
    .then(userTeam => {
      if (!userTeam) return res.status.send({message: "Relationship not found."})      
      return userTeam.destroy()
      .then(() => res.status.send())
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))    
  }
  
}