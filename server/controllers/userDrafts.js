const UserDraft = require('../models').UserDraft
const User = require('../models').User
const Draft = require('../models').Draft

module.exports = {

  retrieveUsersByDraft(req, res) {
    UserDraft.find({ where: { draftId: req.params.draftId} })
    .then(userDraft => {
      return User.findById(userDraft.userId)
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error))
    })
  },

  create(req, res) {
    return UserDraft.create({ 
      isAdmin: req.body.isAdmin, 
      draftId: req.params.draftId, 
      userId: req.params.userId 
    })
    .then(userDraft => {
      User.findById(userDraft.userId)
      .then(user => {
        Draft.findById(userDraft.draftId)
        .then(draft => {
          if (user.drafts) {
            user.drafts.push(draft.name)
          } else {
            user.drafts = [draft.name]
          }
          user.save().then(() => {
            res.status(201).send(userDraft)
          })
          .catch(error => res.status(400).send(error))
        })
      })
    })
    .catch(error => res.status(400).send(error))
  },

  destroy(req, res) {
    return UserDraft.find({ where: { 
      draftId: req.params.draftId,
      userId: req.params.userId 
    }})
    .then(userDraft => {
      if (!userDraft) return res.status.send({message: "Relationship not found."})      
      return userDraft.destroy()
      .then(() => res.status.send())
      .catch(error => res.status(400).send(error))
    })
    .catch(error => res.status(400).send(error))    
  }
  
}