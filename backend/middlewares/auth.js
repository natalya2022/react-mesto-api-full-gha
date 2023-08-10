/* eslint-disable consistent-return */
const { checkToken } = require('../utils/token');
const UnauthorizedError = require('../errors/unauthorized-err');

const checkAuth = (req, res, next) => {
  if (!req.cookies) {
    throw new UnauthorizedError('Ошибка авторизации. Нет cookie');
  }
  const token = req.cookies.jwt;
  const result = checkToken(token);
  req.user = result;
  if (!result) {
    throw new UnauthorizedError(`Ошибка авторизации. Нет юзера ${token}`);
  }
  next();
};

module.exports = checkAuth;
