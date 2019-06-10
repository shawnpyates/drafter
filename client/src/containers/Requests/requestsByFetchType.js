import moment from 'moment';

import {
  incomingRequestsTable as incomingRequestsTableTexts,
  outgoingRequestsTable as outgoingRequestsTableTexts,
  requestsForDraftTable as requestsForDraftTableTexts,
} from '../../../texts.json';

const requestsByFetchType = {
  draft: {
    data: 'requestsForDraft',
    fetchFn: 'fetchByDraft',
    fetchFnArg: 'draftId',
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
          owner: `${teamOwner.firstName} ${teamOwner.lastName}`,
          email: teamOwner.email,
        };
      })
    ),
  },
  requester: {
    data: 'outgoingRequests',
    fetchFn: 'fetchByRequester',
    fetchFnArg: 'userId',
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
    data: 'incomingRequests',
    fetchFn: 'fetchByDraftOwner',
    fetchFnArg: 'userId',
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
          owner: `${teamOwner.firstName} ${teamOwner.lastName}`,
          draftRequested: draft.name,
        };
      })
    ),
  },
};

module.exports = requestsByFetchType;
