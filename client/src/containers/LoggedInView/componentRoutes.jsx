import CreatePlayer from '../CreatePlayer/CreatePlayer';
import CreateTeam from '../CreateTeam/CreateTeam';
import DraftMenu from '../DraftMenu/DraftMenu';
import LoadableCreateDraft from '../CreateDraft/LoadableCreateDraft';
import TeamMenu from '../TeamMenu/TeamMenu';
import UpdateUser from '../UpdateUser/UpdateUser';

module.exports = [
  {
    path: '/createDrafts',
    component: LoadableCreateDraft,
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
    path: '/drafts/:id/update',
    component: LoadableCreateDraft,
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
