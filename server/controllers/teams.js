const { Sequelize } = require('sequelize');

const {
  Team,
  Draft,
  Player,
  Request,
  User,
} = require('../models');
const { createEmailHtml, sendMail } = require('../mailer');

const { SERVER_URL } = process.env;

const getHtmlForMailer = ({
  teamOwnerFirstName,
  draftName,
  teamName,
}) => (
  createEmailHtml(`
    <h2>Congratulations ${teamOwnerFirstName}!</h2>
    <br>
    <p>
      <b>The owner of ${draftName} has accepted your request, and your team ${teamName} is now registered into the draft.</b>
      <br>
      Click <a href=${SERVER_URL}>here</a> to visit DraftMachine and see the updates.
    </p>
  `)
);

const assignSelectionOrderToTeams = (teams, teamsInDraftLength) => {
  let selectionOrder = teamsInDraftLength;
  return teams.map((team) => {
    selectionOrder += 1;
    return { ...team, selectionOrder };
  })
};


module.exports = {
  async fetchOne(req, res) {
    try {
      const team = await Team.findOne({
        where: { uuid: req.params.id },
        include: [Draft, Player, User],
      });
      return res.status(200).send({ team });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraft(req, res) {
    const { id: draftId } = req.params;
    try {
      const teams = await Team.findAll({
        where: { draftId },
        include: [Draft, User, Player],
        order: [['selectionOrder', 'asc']],
      });
      if (!teams.length) return res.status(200).send({ teams: [] });
      return res.status(200).send({ teams });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { body } = req;
      const isBulkCreate = Array.isArray(body);
      const {
        name,
        ownerUserId,
        draftId,
        requestId,
      } = isBulkCreate ? body[0] : body;
      const draftToJoin = await Draft.findOne({
        where: { uuid: draftId },
        include: [Team],
      });
      const { length: teamsInDraftLength } = draftToJoin.Teams;
      if (isBulkCreate) {
        const teamsWithSelectionIds = assignSelectionOrderToTeams(body, teamsInDraftLength);
        await Team.bulkCreate(teamsWithSelectionIds);
        return res.status(201).send({ success: true });
      }
      const team = await Team.create({
        draftId,
        name,
        ownerUserId,
        selectionOrder: teamsInDraftLength + 1,
      });
      if (requestId) {
        const teamWithAssociations = await Team.findOne({
          where: { uuid: team.uuid },
          include: [User],
        });
        const { User: teamOwner } = teamWithAssociations;
        const htmlForMailer = getHtmlForMailer({
          teamOwnerFirstName: teamOwner.firstName,
          draftName: draftToJoin.name,
          teamName: name,
        });
        await sendMail({
          toEmail: teamOwner.email,
          subject: 'You have a new update from DraftMachine',
          html: htmlForMailer,
        });
        const request = await Request.findOne({ where: { uuid: requestId } });
        await request.destroy();
      }
      return res.status(201).send({ success: true });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const team = await Team.findOne({ where: { uuid: req.params.id } });
      if (!team) return res.status(404).send({ e: 'Team not found.' });
      const updatedTeam = await team.update({ name: req.body.name || team.name });
      return res.status(200).send({ team: updatedTeam });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async updateSelectionOrder(req, res) {
    try {
      const { sourceIndex, destinationIndex } = req.body;
      const teams = await Team.findAll({ where: { draftId: req.params.id } });
      const movedTeam = teams.find(team => team.selectionOrder === sourceIndex + 1);
      await movedTeam.update({ selectionOrder: destinationIndex + 1 });
      if (sourceIndex > destinationIndex) {
        const teamsToUpdate = (
          teams
            .filter((team) => {
              const { selectionOrder } = team;
              return (selectionOrder > destinationIndex) && (selectionOrder < sourceIndex + 1);
            })
            .map(team => team.uuid)
        );
        await Team.update({
          where: { uuid: { [Sequelize.Op.in]: teamsToUpdate } },
          selectionOrder: Sequelize.literal('selectionOrder + 1'),
        });
      } else {
        const teamsToUpdate = (
          teams
            .filter((team) => {
              const { selectionOrder } = team;
              return (selectionOrder < destinationIndex + 1) && (selectionOrder > sourceIndex + 1);
            })
            .map(team => team.uuid)
        );
        await Team.update({
          where: { uuid: { [Sequelize.Op.in]: teamsToUpdate } },
          selectionOrder: Sequelize.literal('selectionOrder - 1'),
        });
      }
      return res.status(201).send({ success: true });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const team = await Team.findOne({ where: { uuid: req.params.id } });
      if (!team) return res.status(404).send({ e: 'Team not found.' });
      await team.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
