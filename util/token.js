import jwt from "jsonwebtoken";

export const createToken = (user) => {
  const token = jwt.sign(
    { user: user._id, firstname: user.firstname },
    process.env.JWT_SECRETECODE,
    { expiresIn: "1h" }
  );
  return token;
};
