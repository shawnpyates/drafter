import {
  CreateDraft,
  CreateTeam,
  CreatePlayer,
  UpdateUser,
  DraftMenu,
  TeamMenu,
} from '..';

module.exports = [
  {
    path: '/createDrafts',
    component: CreateDraft,
  },
  {
    path: '/createTeams',
    component: CreateTeam,
  },
  {
    path: '/drafts/:id/createTeams',
    component: CreateTeam,
  },
  {
    path: '/updateUser',
    component: UpdateUser,
  },
  {
    path: '/drafts/:id/show',
    component: DraftMenu,
  },
  {
    path: '/teams/:id/show',
    component: TeamMenu,
  },
  {
    path: '/teams/:id/createPlayers',
    component: CreatePlayer,
  },
  {
    path: '/drafts/:id/createPlayers',
    component: CreatePlayer,
  },
];
