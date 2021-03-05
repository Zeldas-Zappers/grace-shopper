function ensureAdmin(req, res, next) {
  if (req.user && req.user.adminStatus) {
    return next()
  } else {
    res.sendStatus(403) // client does not have access rights to the content
  }
}

function ensureLogin(req, res, next) {
  if (req.user) {
    return next()
  } else {
    res.sendStatus(401) // unauthorised
  }
}

module.exports = {ensureAdmin, ensureLogin}
