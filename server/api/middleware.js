function ensureAdmin(req, res, next) {
  if (req.user && req.user.adminStatus) {
    // this should be just next(), not return next()
    return next()
  } else {
    res.sendStatus(403) // client does not have access rights to the content
  }
}

function ensureLogin(req, res, next) {
  console.log('in ensureLogin!!!!!!!! req.user', req.user)
  if (req.user) {
    // this should be just next(), not return next()
    return next()
  } else {
    res.sendStatus(401) // unauthorised
  }
}

module.exports = {ensureAdmin, ensureLogin}
