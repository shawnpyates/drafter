const {
  users,
  teams,
  drafts,
  players,
  userTeams,
  userDrafts,
} = require('../controllers');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the Drafter API.' });
  });

  // users
  app.get('/api/users/:id', users.fetchOne);
  app.post('/api/users', users.create);
  app.post('/api/users/auth', users.authenticate);
  app.put('/api/users/:id', users.update);
  app.delete('/api/users/:id', users.destroy);

  // drafts
  app.get('/api/drafts/:id', drafts.fetchOne);
  app.post('/api/drafts', drafts.create);
  app.put('/api/drafts/:id', drafts.update);
  app.delete('/api/drafts/:id', drafts.destroy);

  // teams
  app.get('/api/teams/:id', teams.fetchOne);
  app.post('/api/teams', teams.create);
  app.put('/api/teams/:id', teams.update);
  app.delete('/api/teams/:id', teams.destroy);

  // players
  app.get('/api/players/:id', players.fetchOne);
  app.post('/api/players', players.create);
  app.put('/api/players/:id', players.update);
  app.delete('/api/players/:id', players.destroy);
  app.delete('/api/players/destroyMany', players.destroyMany);

  // user's association with draft
  app.get('/api/drafts/:draftId/users', userDrafts.fetchUsersByDraft);
  app.get('/api/users/:userId/drafts', userDrafts.fetchDraftsByUser);
  app.post('/api/drafts/:draftId/users/:userId', userDrafts.create);
  app.delete('/api/drafts/:draftId/users/:userId', userDrafts.destroy);

  // user's association with team
  app.get('/api/teams/:teamId/users', userTeams.fetchUsersByTeam);
  app.get('/api/users/:userId/teams', userTeams.fetchTeamsByUser);
  app.post('/api/teams/:teamId/users/:userId', userTeams.create);
  app.delete('/api/teams/:teamId/users/:userId', userTeams.destroy);
};
