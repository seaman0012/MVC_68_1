const ApplicationBase = require('./ApplicationBase');

class RegularApplication extends ApplicationBase {
  isEligible(candidate) {
    if (candidate.status !== 'graduated') {
      return { ok: false, reason: 'รับเฉพาะผู้สมัครที่จบแล้ว (งานปกติ)' };
    }
    return { ok: true };
  }
}

module.exports = RegularApplication;