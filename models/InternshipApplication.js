const ApplicationBase = require('./ApplicationBase');

class InternshipApplication extends ApplicationBase {
  isEligible(candidate) {
    if (candidate.status !== 'studying') {
      return { ok: false, reason: 'รับเฉพาะผู้สมัครที่กำลังศึกษา (สหกิจศึกษา)' };
    }
    return { ok: true };
  }
}

module.exports = InternshipApplication;