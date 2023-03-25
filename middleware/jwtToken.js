const jwt = require('jsonwebtoken')
const localStorage = require('local-storage');

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET,{ expiresIn: `2h` });
}

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token || localStorage.get('user');
    if (!token) {
      return res.redirect("/")
      console.log("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded;
      // console.log(req.user.username);
    } catch (err) {
      return res.redirect("/")
      console.log("Invalid Token");
    }
    return next();
  };

module.exports = {
    generateAccessToken,verifyToken
}