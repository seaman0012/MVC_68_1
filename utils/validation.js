function isValidEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidId8(id) {
  return /^[1-9][0-9]{7}$/.test(String(id));
}

module.exports = { isValidEmail, isValidId8 };