const {
  Request,
  User,
  Draft,
} = require('../models');
const { createEmailHtml, sendMail } = require('../mailer');

const { SERVER_URL } = process.env;

const PENDING_DRAFT_STATUSES = ['unscheduled', 'scheduled'];

const VALID_DURATION = 60 * 60 * 24 * 7 * 1000; // one week

const getHtmlForMailer = ({
  draftOwnerFirstName,
  requestCreatorFullName,
  teamName,
  draftName,
}) => (
  createEmailHtml(`
    <h2>Hello there, ${draftOwnerFirstName}!</h2>
    <br>
    <p>
      <b>${requestCreatorFullName}</b> has made a request for their team <b>${teamName}</b> to join your draft <b>${draftName}</b>.
      <br>
      Click <a href=${SERVER_URL}>here</a> to visit DraftMachine and accept or decline the request.
    </p>
  `)
);

module.exports = {
  async fetchOne(req, res) {
    try {
      const request = await Request.findOne({ where: { uuid: req.params.id } });
      return res.status(200).send({ request });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraft(req, res) {
    const { id: draftId } = req.params;
    try {
      const requests = await Request.findAll({
        where: { draftId },
        include: [User, Draft],
        order: [['createdAt', 'asc']],
      });
      if (!requests.length) return res.status(200).send({ requests: [] });
      return res.status(200).send({ requests });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByRequester(req, res) {
    const { id: userId } = req.params;
    try {
      // outgoing - needs draftName
      const requests = await Request.findAll({
        where: { requestCreatorId: userId },
        include: [Draft],
        order: [['createdAt', 'asc']],
      });
      if (!requests.length) return res.status(200).send({ requests: [] });
      return res.status(200).send({ requests });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async fetchByDraftOwner(req, res) {
    const { id: userId } = req.params;
    try {
      const requests = await Request.findAll({
        include: [
          {
            model: Draft,
            where: { ownerUserId: userId },
          },
          User,
        ],
        order: [['createdAt', 'asc']],
      });
      if (!requests.length) return res.status(200).send({ requests: [] });
      return res.status(200).send({ requests });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async create(req, res) {
    try {
      const { teamName, draftName, requestCreatorId } = req.body;
      const draftWithOwner = await Draft.findOne({
        where: { name: draftName }, include: [User],
      });
      if (!draftWithOwner) {
        return res.status(400).send({
          e: 'Unable to find a draft with that name.',
        });
      }
      if (!PENDING_DRAFT_STATUSES.includes(draftWithOwner.status)) {
        return res.status(400).send({
          e: 'Sorry, this draft has already started and cannot accept new teams.',
        });
      }
      const requestCreator = await User.findOne({ where: { uuid: requestCreatorId } });
      const {
        firstName: draftOwnerFirstName,
        email: draftOwnerEmail,
        uuid: draftOwnerUserId,
      } = draftWithOwner.User;
      if (draftOwnerUserId === requestCreatorId) {
        return res.status(400).send({
          e: `You are the owner of ${draftName}. You cannot make a request to yourself.`,
        });
      }
      const expiresAt = new Date(new Date().getTime() + VALID_DURATION);
      const request = await Request.create({
        teamName,
        expiresAt,
        draftId: draftWithOwner.uuid,
        requestCreatorId,
      });
      const requestCreatorFullName = `${requestCreator.firstName} ${requestCreator.lastName}`;
      const htmlForMailer = getHtmlForMailer({
        draftOwnerFirstName,
        requestCreatorFullName,
        teamName,
        draftName,
      });
      await sendMail({
        toEmail: draftOwnerEmail,
        subject: 'You have a new request from DraftMachine',
        html: htmlForMailer,
      });
      return res.status(201).send({ request });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async update(req, res) {
    try {
      const request = await Request.findOne({ where: { uuid: req.params.id } });
      if (!request) return res.status(404).send({ e: 'Request not found.' });
      const updatedRequest = await Request.update({ teamName: req.body.name || request.name });
      return res.status(200).send({ request: updatedRequest });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const request = await Request.findOne({ where: { uuid: id } });
      if (!request) return res.status(404).send({ e: 'Request not found.' });
      await request.destroy();
      return res.status(200).send({ destroyedRequestId: id });
    } catch (e) {
      return res.status(400).send({ e });
    }
  },
};
