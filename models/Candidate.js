class Candidate {
  constructor({ id, firstName, lastName, email, status }) {
    this.id = id; 
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.status = status;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
module.exports = Candidate;