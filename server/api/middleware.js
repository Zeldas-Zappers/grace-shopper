const User = require('../db/models/user')

function ensureAdmin(req, res, next) {
  if (req.user && req.user.adminStatus) {
    return next()
  } else {
    res.sendStatus(403) // client does not have access rights to the content
  }
}

function ensureLogin(req, res, next) {
  const id = req.user.id
  const passportId = req.session.passport.user
  //console.log("HELLLOOOOOO", req.session)
  if (id) {
    if (id === passportId) {
      next()
    }
  } else {
    res.sendStatus(401) // unauthorised
  }
}

module.exports = {ensureAdmin, ensureLogin}
