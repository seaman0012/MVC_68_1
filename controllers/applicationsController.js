const DataStore = require('../models/DataStore');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const InternshipApplication = require('../models/InternshipApplication');
const RegularApplication = require('../models/RegularApplication');
const { isValidEmail } = require('../utils/validation');

exports.applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const clientLocalTime = req.body.clientLocalTime || null;

  const jobs = await DataStore.readJson('jobs');
  const candidates = await DataStore.readJson('candidates');
  const applications = await DataStore.readJson('applications');

  const jobData = jobs.find(j => j.id === jobId);
  if (!jobData) return res.status(404).send('ไม่พบตำแหน่งงาน');
  const job = new Job(jobData);

  // Session student
  const candidateId = req.session.user?.candidateId;
  const candidateData = candidates.find(c => c.id === candidateId);
  if (!candidateData) return res.status(400).send('ไม่พบข้อมูลผู้สมัครที่เชื่อมกับบัญชีนี้');

  const candidate = new Candidate(candidateData);

  // Validate email
  if (!isValidEmail(candidate.email)) {
    return res.status(400).render('jobs/apply', { job, company: null, error: 'อีเมลผู้สมัครไม่ถูกต้อง' });
  }

  // Check duplicate application
  const hasApplied = applications.some(
    a => a.jobId === job.id && a.candidateId === candidate.id
  );
  if (hasApplied) {
    return res.status(400).render('jobs/apply', { job, company: null, error: 'คุณได้สมัครตำแหน่งนี้แล้ว' });
  }

  // Check job status and deadline
  if (job.status !== 'open') {
    return res.status(400).render('jobs/apply', { job, company: null, error: 'ตำแหน่งนี้ปิดรับสมัครแล้ว' });
  }
  const now = new Date();
  if (new Date(job.deadline) < now) {
    return res.status(400).render('jobs/apply', { job, company: null, error: 'เลยกำหนดรับสมัครแล้ว' });
  }

  // Select model by job type
  let appModel;
  if (job.type === 'internship') {
    appModel = new InternshipApplication();
  } else {
    appModel = new RegularApplication();
  }

  // Business rule check by model
  const eligible = appModel.isEligible(candidate);
  if (!eligible.ok) {
    return res.status(400).render('jobs/apply', { job, company: null, error: eligible.reason });
  }

  // Create application record
  const application = {
    id: generateId(),
    jobId: job.id,
    candidateId: candidate.id,
    jobType: job.type,
    appliedAt: new Date().toISOString(), // server time
    clientLocalTime: clientLocalTime || '', // optional client machine time
    status: 'submitted',
    adminGrade: '' // for admin demo
  };

  applications.push(application);
  await DataStore.writeJson('applications', applications);

  // After apply -> redirect to job list (business rule)
  res.redirect('/jobs');
};

function generateId() {
  // 8-digit starting non-zero
  const n = Math.floor(Math.random() * 90000000) + 10000000;
  return String(n);
}