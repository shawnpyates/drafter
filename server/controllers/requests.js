const { Request, User, UserDraft } = require('../models');
const { createEmailHtml, transport } = require('../mailer');

const { SERVER_URL } = process.env;

const VALID_DURATION = 60 * 60 * 24 * 7 * 1000; // one week

const getHtmlForMailer = (draftName, creatorName, teamName) => (
  createEmailHtml(`
    ${creatorName} has made a request for their team ${teamName} to join your draft ${draftName}
    \n
    Click <a href=${SERVER_URL}>here</a> to visit DraftMachine and accept or decline the request.
  `)
);

const sendMail = async ({ fromEmail, toEmail, html }) => {
  await transport.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: 'You have a new request from DraftMachine',
    html,
  });
};

module.exports = {
  async fetchOne(req, res) {
    try {
      const request = await Request.find({ where: { uuid: req.params.id } });
      return res.status(200).send({ request });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraft(req, res) {
    const { id: draftId } = req.params;
    try {
      const requests = await Request.findAll({ where: { draftId } });
      if (!requests.length) return res.status(200).send({ requests: [] });
      return res.status(200).send({ requests });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByUser(req, res) {
    const { id: userId } = req.params;
    try {
      const requests = await Request.findAll({ where: { userId } });
      if (!requests.length) return res.status(200).send({ requests: [] });
      return res.status(200).send({ requests });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { teamName, draftId, requestCreatorId } = req.body;
      const expiresAt = new Date() + VALID_DURATION;
      const request = await Request.create({
        teamName,
        expiresAt,
        draftId,
        requestCreatorId,
      });
      const requestCreator = User.find({ where: { uuid: requestCreatorId } });
      const draftWithOwner = UserDraft.find({ where: { draftId }, include: [User] });
      const { firstName, lastName, email: draftOwnerEmail } = draftWithOwner.User;
      const draftOwnerName = `${firstName} ${lastName}`;
      const htmlForMailer = getHtmlForMailer(draftOwnerName, requestCreator.name, teamName);
      await sendMail({
        fromEmail: requestCreator.email,
        toEmail: draftOwnerEmail,
        html: htmlForMailer,
      });
      return res.status(201).send({ request });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const request = await Request.find({ where: { uuid: req.params.id } });
      if (!request) return res.status(404).send({ e: 'Request not found.' });
      const updatedRequest = await Request.update({ teamName: req.body.name || request.name });
      return res.status(200).send({ request: updatedRequest });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const request = await Request.find({ where: { uuid: req.params.id } });
      if (!request) return res.status(404).send({ e: 'Request not found.' });
      await request.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
