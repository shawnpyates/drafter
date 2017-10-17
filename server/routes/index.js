const user = require('../controllers').users
const team = require('../controllers').teams
const todoItemsController = require('../controllers').todoItems

module.exports = app => {
  app.get('/api', (req, res) => {
    console.log('req', req)
    res.status(200).send({ message: "Welcome to the Draft API." })
  })
  app.post('/api/users', user.create)
  app.post('/api/teams/:draftId', team.create)
  // app.get('/api/todos', todosController.list),
  // app.post('/api/todos/:todoId/items', todoItemsController.create),
  // app.get('/api/todos/:todoId', todosController.retrieve),
  // app.put('/api/todos/:todoId', todosController.update),
  // app.delete('/api/todos/:todoId', todosController.destroy)
}
