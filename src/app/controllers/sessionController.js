const {
  User
} = require('../models')

class SessionController {
  async login(req, res) {
    const {
      email,
      password
    } = req.body
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return res.status(401).json('User not found!')
    }

    const isCorrectPassword = await user.checkPassword(password)

    if (!isCorrectPassword) {
      return res.status(401).json('Incorrect password!')
    }

    res.status(200).json({
      user,
      token: user.generateToken()
    })
  }
}

module.exports = new SessionController()