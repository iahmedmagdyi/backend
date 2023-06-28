const { verify } = require("jsonwebtoken");

const validationToken = (req, res, next) => {
  const accesstoken = req.header("accesstoken");
  if (!accesstoken) {
    return res.json({ error: "user not logged in " });
  }

  try {
    const validToken = verify(accesstoken, "importantsecret");
    req.user = validToken
    if (validToken) {
      return next();
    }
  } catch (error) {
    res.json({ error: error });
  }
};
module.exports = { validationToken };
