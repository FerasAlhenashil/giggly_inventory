const jwt = require('jsonwebtoken');
const secret = 'aSecritveSecret'

exports.isAuth = (req, res, next) => {
  console.log('in middleware is-auth, the token is ', req.cookies.token)
    const token = req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            res.status(401).send('Unauthorized: Invalid token');
          } else {
            req.username = decoded.username;
            next();
          }
        });
    }
}
