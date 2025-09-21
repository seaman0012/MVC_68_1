const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

async function readJson(name) {
  const file = path.join(dataDir, `${name}.json`);
  const content = await fs.promises.readFile(file, 'utf-8');
  return JSON.parse(content);
}

async function writeJson(name, data) {
  const file = path.join(dataDir, `${name}.json`);
  await fs.promises.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { readJson, writeJson };