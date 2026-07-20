const jwt = require('jsonwebtoken');

function authMiddleware(secret) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Требуется авторизация' });
    try {
      req.user = jwt.verify(token, secret);
      next();
    } catch {
      res.status(401).json({ error: 'Недействительный токен' });
    }
  };
}

module.exports = { authMiddleware };
