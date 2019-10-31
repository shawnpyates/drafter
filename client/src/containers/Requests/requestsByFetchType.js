import moment from 'moment';

import {
  incomingRequestsTable as incomingRequestsTableTexts,
  outgoingRequestsTable as outgoingRequestsTableTexts,
  requestsForDraftTable as requestsForDraftTableTexts,
} from '../../texts.json';

const requestsByFetchType = {
  draft: {
    tableTexts: requestsForDraftTableTexts,
    getDataForTable: requests => (
      requests.map((request) => {
        const {
          uuid,
          teamName: team,
          User: teamOwner,
        } = request;
        return {
          uuid,
          team,
          ownerName: `${teamOwner.firstName} ${teamOwner.lastName}`,
          ownerEmail: teamOwner.email,
        };
      })
    ),
  },
  requester: {
    tableTexts: outgoingRequestsTableTexts,
    getDataForTable: requests => (
      requests.map((request) => {
        const {
          uuid,
          teamName: team,
          Draft: draft,
          expiresAt,
        } = request;
        return {
          uuid,
          team,
          draftRequested: draft.name,
          expiresAt: moment(expiresAt).format('MMM D YYYY, h:mm a'),
        };
      })
    ),
  },
  draftOwner: {
    tableTexts: incomingRequestsTableTexts,
    getDataForTable: requests => (
      requests.map((request) => {
        const {
          uuid,
          teamName: team,
          User: teamOwner,
          Draft: draft,
        } = request;
        return {
          uuid,
          team,
          ownerName: `${teamOwner.firstName} ${teamOwner.lastName}`,
          draftRequested: draft.name,
        };
      })
    ),
  },
};

module.exports = requestsByFetchType;
