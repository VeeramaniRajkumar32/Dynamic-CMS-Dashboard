const jwt = require('jsonwebtoken')

const generateAccessToken = (username) => {
    return jwt.sign(username, process.env.JWT_SECRET,{ expiresIn: `2h` });
}

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
    if (!token) {
      console.log("A token is required for authentication");
      return res.redirect("/")
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded;
      // console.log(req.user.username);
    } catch (err) {
      console.log("Invalid Token");
      return res.redirect("/")
    }
    return next();
  };

module.exports = {
    generateAccessToken,verifyToken
}