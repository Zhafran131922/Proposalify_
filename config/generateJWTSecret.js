const crypto = require('crypto');

// Generate JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

console.log(generateJWTSecret());
