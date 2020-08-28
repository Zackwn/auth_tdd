const jwt = require('jsonwebtoken')
require('dotenv/config')
const {
  promisify
} = require('util')

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) {
    return res.status(403).send()
  }

  const [, token] = auth.split(' ')

  if (!token) {
    return res.status(403).send()
  }

  try {
    const payload = await promisify(jwt.verify)(token, process.env.JWT)

    if (!payload) {
      return res.status(403).send()
    }

    req.user_id = payload.id
    return next()
  } catch (error) {
    return res.status(403).send()
  }

}