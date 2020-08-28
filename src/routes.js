const routes = require('express').Router()
const SessionController = require('./app/controllers/sessionController')
const auth = require('./app/middlewares/auth')

routes.post('/login', SessionController.login)

routes.use(auth)

routes.get('/dashboard', (req, res) => {
  if (!req.user_id) {
    return res.status(403).send()
  }
  res.status(200).json({
    user_id: req.user_id
  })
})

module.exports = routes