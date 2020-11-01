module.exports = () => {
  const jwt = require("jsonwebtoken");
  const config = require("../config");

  const authenticate = (req, res, next) => {
    if (req.headers["x-auth-key"]) {
      try {
        var decoded = jwt.verify(
          req.headers["x-auth-key"],
          config["jwt_secret_key"]
        );
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).send({ status: 401, error });
      }
    } else {
      res.status(403).send({
        status: 403,
        error: {
          message: "Required x-auth-key token",
        },
      });
    }
  };
  return {
    authenticate,
  };
};
