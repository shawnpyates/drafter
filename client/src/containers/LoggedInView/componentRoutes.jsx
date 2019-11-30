import CreateDraft from '../CreateDraft/CreateDraft';
import CreatePlayer from '../CreatePlayer/CreatePlayer';
import CreateTeam from '../CreateTeam/CreateTeam';
import DraftMenu from '../DraftMenu/DraftMenu';
import PlayerMenu from '../PlayerMenu/PlayerMenu';
import TeamMenu from '../TeamMenu/TeamMenu';
import UpdateSelectionOrder from '../UpdateSelectionOrder/UpdateSelectionOrder';
import UpdateUser from '../UpdateUser/UpdateUser';

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
    path: '/teams/:id/update',
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
    component: CreateDraft,
  },
  {
    path: '/drafts/:id/reorderTeams',
    component: UpdateSelectionOrder,
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
  {
    path: '/players/:id/update',
    component: CreatePlayer,
  },
  {
    path: '/players/:id/show',
    component: PlayerMenu,
  },
];
