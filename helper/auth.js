const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  if (req.url.includes("/login") || req.url.includes("/refreshToken"))
    return next();
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, "Sdafji@1213");
    if (decoded) {
      req.user = decoded.user;
      req.id = decoded.id;
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};
module.exports = { verifyToken };
