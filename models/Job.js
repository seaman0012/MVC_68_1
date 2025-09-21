class Job {
  constructor({ id, title, description, companyId, deadline, status, type }) {
    this.id = id; // 8 digits, non-zero first
    this.title = title;
    this.description = description;
    this.companyId = companyId;
    this.deadline = deadline; // ISO string
    this.status = status; // 'open' | 'closed'
    this.type = type; // 'regular' | 'internship'
  }
}
module.exports = Job;