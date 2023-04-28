import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    req.claim = jwt.verify(token, process.env.JWT_SECRETECODE);
    next();
  } catch (err) {
    res.status(401).end();
  }
};
