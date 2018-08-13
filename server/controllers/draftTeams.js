import Sequelize from 'sequelize';

import { User, Draft, Team, DraftTeam } from '../models';

const { in: opIn } = Sequelize.Op;

module.exports = {

 retrieveDraftsByTeam(req, res) {
    DraftTeam.findAll({ where: { teamId: req.params.teamId }, include: [Draft] })
      .then((draftTeams) => {
        if (!draftTeams.length) {
          res.status(201).send([]);
          return;
        }
        const drafts = DraftTeams.map(dt => dt.Draft);
        const ownerIds = drafts.map(draft => draft.ownerUserId);
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
            res.status(201).send({ drafts, owners });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

 retrieveTeamsByDraft(req, res) {
    DraftTeam.findAll({ where: { draftId: req.params.draftId }, include: [Team] })
      .then((draftTeams) => {
        if (!draftTeams.length) {
          res.status(201).send([]);
          return;
        }
        const teams = DraftTeams.map(dt => dt.Team);
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
    const { draftId, teamId } = req.params;
    return DraftTeam.create({ draftId, teamId })
      .then((draftTeam) => {
        if (res) res.status(201).send(draftTeam)
      })
      .catch((error) => {
        if (res) res.status(400).send(error)
      });
  },

  destroy(req, res) {
    const { draftId, teamId } = req.params;
    return UserDraft.find({ where: { draftId, teamId } })
      .then((userDraft) => {
        if (!userDraft) return res.status.send({ message: 'Relationship not found.' });
        return userDraft.destroy()
          .then(() => res.status.send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};
