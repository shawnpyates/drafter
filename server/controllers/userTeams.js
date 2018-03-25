import { User, Team, UserTeam } from '../models';

module.exports = {

  retrieveUsersByTeam(req, res) {
    const { teamId } = req.params;
    return UserTeam.find({ where: { teamId } })
      .then(userTeam => (
        User.findById(userTeam.userId)
          .then(users => res.status(201).send(users))
          .catch(error => res.status(400).send(error))
      ))
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const { isAdmin } = req.body;
    const { teamId, userId } = req.params;
    return UserTeam.create({ isAdmin, teamId, userId })
      .then((userTeam) => {
        User.findById(userTeam.userId)
          .then((user) => {
            Team.findById(userTeam.teamId)
              .then((team) => {
                user.teams.push(team.name);
                user.save().then(() => {
                  res.status(201).send(userTeam);
                })
                  .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    const { teamId, userId } = req.params;
    return UserTeam.find({ where: { teamId, userId } })
      .then((userTeam) => {
        if (!userTeam) return res.status.send({ message: 'Relationship not found.' });
        return userTeam.destroy()
          .then(() => res.status.send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
