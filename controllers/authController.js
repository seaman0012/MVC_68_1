const DataStore = require('../models/DataStore');

exports.getLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const users = await DataStore.readJson('users');
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).render('auth/login', { error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  }

  // Attach session user
  req.session.user = {
    username: user.username,
    role: user.role,
    candidateId: user.candidateId || null
  };

  // Redirect role-based
  if (user.role === 'admin') {
    return res.redirect('/admin');
  }
  return res.redirect('/jobs');
};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};