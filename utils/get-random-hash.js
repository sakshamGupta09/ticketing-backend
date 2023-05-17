const crypto = require("crypto");

function createUniqueHash() {
  return crypto.randomUUID();
}

module.exports = createUniqueHash;
