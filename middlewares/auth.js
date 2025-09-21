function ensureAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function ensureStudent(req, res, next) {
  if (req.session.user && req.session.user.role === 'student') return next();
  res.redirect('/login');
}

function ensureAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') return next();
  res.redirect('/login');
}

module.exports = { ensureAuthenticated, ensureStudent, ensureAdmin };