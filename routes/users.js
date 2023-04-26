import express from "express";
import {
  addUser,
  deleteUser,
  editUser,
  getAllUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controller/userController.js";
import { encryptPassword } from "../middleware/encryptPassword.js";
import { validation } from "../middleware/validator.js";
import { body } from "express-validator";

export const user_router = new express.Router();

// ---------------------------------------- GET
user_router.get("/getAll", getAllUser);
user_router.get("/get", getUser);

//logout
user_router.get("/logout", logoutUser);

// ---------------------------------------- POST
// register
user_router.post(
  "/add",
  body("password").isStrongPassword(),
  body("email").isEmail(),
  validation,
  encryptPassword,
  addUser
);

//login
user_router.post(
  "/login",
  body("password").isStrongPassword(),
  body("email").isEmail(),
  validation,
  encryptPassword,
  loginUser
);

// ---------------------------------------- PUT
user_router.put("/edit", body("email").isEmail(), validation, editUser);

// ---------------------------------------- DELETE
user_router.delete("/delete", encryptPassword, deleteUser);
