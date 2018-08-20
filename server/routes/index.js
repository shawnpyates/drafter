import {
  users,
  teams,
  drafts,
  userTeams,
  userDrafts,
  draftTeams,
} from '../controllers';

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Drafter API.' });
  });

  // users
  app.get('/api/users/:id', users.retrieveOne);
  app.post('/api/users', users.create);
  app.post('/api/users/auth', users.authenticate);
  app.put('/api/users/:id', users.update);
  app.delete('/api/users/:id', users.destroy);

  // drafts
  app.get('/api/drafts', drafts.retrieve);
  app.get('/api/drafts/:id', drafts.retrieveOne);
  app.post('/api/drafts', drafts.create);
  app.put('/api/drafts/:id', drafts.update);
  app.delete('/api/drafts/:id', drafts.destroy);

  // teams
  app.get('/api/teams', teams.retrieve);
  app.get('/api/teams/:id', teams.retrieveOne);
  app.post('/api/teams', teams.create);
  app.put('/api/teams/:id', teams.update);
  app.delete('/api/teams/:id', teams.destroy);

  // user's association with draft
  app.get('/api/drafts/:draftId/users', userDrafts.retrieveUsersByDraft);
  app.get('/api/users/:userId/drafts', userDrafts.retrieveDraftsByUser);
  app.post('/api/drafts/:draftId/users/:userId', userDrafts.create);
  app.delete('/api/drafts/:draftId/users/:userId', userDrafts.destroy);

  // user's association with team
  app.get('/api/teams/:teamId/users', userTeams.retrieveUsersByTeam);
  app.get('/api/users/:userId/teams', userTeams.retrieveTeamsByUser);
  app.post('/api/teams/:teamId/users/:userId', userTeams.create);
  app.delete('/api/teams/:teamId/users/:userId', userTeams.destroy);

  // draft's association with team
  app.get('/api/teams/:teamId/drafts', draftTeams.retrieveDraftsByTeam);
  app.get('/api/drafts/:draftId/teams', draftTeams.retrieveTeamsByDraft);
  app.post('/api/drafts/:draftId/teams/:teamId', draftTeams.create);
  app.delete('/api/drafts/:draftId/teams/:teamId', draftTeams.destroy);
};
