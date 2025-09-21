const DataStore = require('../models/DataStore');
const Job = require('../models/Job');
const Company = require('../models/Company');

exports.listOpenJobs = async (req, res) => {
  const rawJobs = await DataStore.readJson('jobs');
  const companies = await DataStore.readJson('companies');

  // Only open jobs, sort by deadline ASC
  const jobs = rawJobs
    .filter(j => j.status === 'open')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .map(j => new Job(j));

  // Map companyId to company name
  const companyMap = companies.reduce((m, c) => {
    m[c.id] = new Company(c);
    return m;
  }, {});

  res.render('jobs/list', { jobs, companyMap });
};

exports.getApplyForm = async (req, res) => {
  const { jobId } = req.params;
  const jobs = await DataStore.readJson('jobs');
  const companies = await DataStore.readJson('companies');

  const jobData = jobs.find(j => j.id === jobId);
  if (!jobData) return res.status(404).send('ไม่พบตำแหน่งงาน');

  const job = new Job(jobData);
  const company = companies.find(c => c.id === job.companyId) || null;

  res.render('jobs/apply', { job, company, error: null });
};