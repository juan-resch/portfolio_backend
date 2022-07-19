const { codes } = require("../utils");

module.exports = {
  adminAuth: async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(codes.UNAUTHORIZED)
        .json({ sucess: false, error: "Token not provided" });
    }

    if (authorization !== "juanreschsecret") {
      return res
        .status(codes.UNAUTHORIZED)
        .json({ sucess: false, error: "Unauthorized" });
    }

    return next();
  },
};
