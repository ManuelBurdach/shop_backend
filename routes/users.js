import express from "express";
import { addUser, deleteUser, editUser, getAllUser, getUser } from "../models/users.js";
import { encryptPassword } from "../middleware/encryptPassword.js";
import { validation } from "../middleware/validator.js";
import { body } from "express-validator";

export const user_router = new express.Router();

user_router.get("/getAll", getAllUser);
user_router.get("/get", getUser);

user_router.post(
  "/add",
  body("password").isStrongPassword(),
  body("email").isEmail(),
  validation,
  encryptPassword,
  addUser
);

user_router.put("/edit", body("email").isEmail(), validation, editUser);

user_router.delete("/delete", encryptPassword, deleteUser);
