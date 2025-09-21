const DataStore = require('../models/DataStore');

exports.dashboard = async (req, res) => {
  const applications = await DataStore.readJson('applications');
  const jobs = await DataStore.readJson('jobs');
  const candidates = await DataStore.readJson('candidates');

  const jobMap = jobs.reduce((m, j) => {
    m[j.id] = j;
    return m;
  }, {});
  const candidateMap = candidates.reduce((m, c) => {
    m[c.id] = c;
    return m;
  }, {});

  res.render('admin/dashboard', { applications, jobMap, candidateMap, message: null });
};

exports.gradeApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { grade } = req.body;

  const applications = await DataStore.readJson('applications');
  const idx = applications.findIndex(a => a.id === applicationId);
  if (idx === -1) return res.status(404).send('ไม่พบใบสมัคร');

  applications[idx].adminGrade = grade || '';
  await DataStore.writeJson('applications', applications);

  const jobs = await DataStore.readJson('jobs');
  const candidates = await DataStore.readJson('candidates');

  const jobMap = jobs.reduce((m, j) => { m[j.id] = j; return m; }, {});
  const candidateMap = candidates.reduce((m, c) => { m[c.id] = c; return m; }, {});

  res.render('admin/dashboard', { applications, jobMap, candidateMap, message: 'บันทึกเกรดเรียบร้อย' });
};