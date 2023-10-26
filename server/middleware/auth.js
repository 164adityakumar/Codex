const jwt = require('jsonwebtoken');
const SECRET = 'SECr3t';  // This should be in an environment variable in a real application

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    //here we are taking the element with index 1 after splitting the string because we are sending token as "Bearer "+ token
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
    authenticateJwt,
    SECRET
}