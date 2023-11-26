const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(401).send({ message: "unauthorized request" });
      }

      token = token.split(" ")[1];
      // console.log(token);

      let verifiedUser = jwt.verify(token, "JCWD08");
      if (!verifiedUser) {
        return res.status(401).send({ message: "unauthorized request" });
      }

      console.log(token);
      console.log(verifiedUser);
      req.user = verifiedUser;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  checkRole: (req, res, next) => {
    if (req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: "Unauthorized! Admin only" });
  },
};
