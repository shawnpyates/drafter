import Sequelize from 'sequelize';

import { User, Team, UserTeam } from '../models';

const { in: opIn } = Sequelize.Op;

module.exports = {

  retrieveUsersByTeam(req, res) {
    const { teamId } = req.params;
    return UserTeam.findAll({ where: { teamId } })
      .then((userTeams) => {
        if (!userTeams.length) {
          res.status(201).send([]);
          return;
        }
        const userIds = userTeams.map(ut => ut.userId);
        return User.findAll({
          where: {
            id: { [opIn]: userIds },
          },
        })
          .then(users => res.status(201).send(users))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  retrieveTeamsByUser(req, res) {
    UserTeam.findAll({ where: { userId: req.params.userId }, include: [Team] })
      .then((userTeams) => {
        if (!userTeams.length) {
          res.status(201).send([]);
          return;
        }
        const teams = userTeams.map(ut => ut.Team);
        const ownerIds = teams.map(team => team.ownerUserId);
        return User.findAll({
          where: {
            id: { [opIn]: ownerIds }
          }
        })
          .then((users) => {
            const owners = ownerIds.map((ownerId) => {
              const owner = users.find(user => user.id === ownerId);
              const ownerName = `${owner.firstName} ${owner.lastName}`;
              return { id: ownerId, name: ownerName };
            });
            res.status(201).send({ teams, owners });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  create(req, res) {
    const { isOwner, isAdmin } = req.body;
    const { teamId, userId } = req.params;
    return UserTeam.create({ isOwner, isAdmin, teamId, userId })
      .then((userTeam) => {
        if (res) res.status(201).send(userTeam)
      })
      .catch((error) => {
        if (res) res.status(400).send(error)
      });
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
