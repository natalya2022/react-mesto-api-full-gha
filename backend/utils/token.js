const JWT = require('jsonwebtoken');

// const SECRET_KEY = 'super-strong-secret';

function generateToken(payload) {
  return JWT.sign(payload, process.env.SECRET_KEY || 'vIzJsipB3EQBep7zf5QUu-wyDbKx1l', {
    expiresIn: '7d',
  });
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return JWT.verify(token, process.env.SECRET_KEY || 'vIzJsipB3EQBep7zf5QUu-wyDbKx1l');
  } catch (err) {
    return false;
  }
}

module.exports = { generateToken, checkToken };
