import CreateDraft from '../CreateDraft/createDraft';
import CreateTeam from '../CreateTeam/createTeam';
import CreatePlayer from '../CreatePlayer/createPlayer';
import UpdateUser from '../UpdateUser/updateUser';
import DraftMenu from '../DraftMenu/draftMenu';
import TeamMenu from '../TeamMenu/teamMenu';

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
