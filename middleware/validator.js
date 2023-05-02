import { validationResult } from "express-validator";

export const loginUserSchema = {
  email: {
    isEmail: true,
  },
  password: {
    isStrongPassword: true,
  },
};

export const validation = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) next();
  else {
    res.status(400).json({ error: errors.array() });
  }
};
