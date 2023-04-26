import { ObjectId } from "mongodb";
import { getDb } from "../util/db.js";
import { createToken } from "../util/token.js";

// ---------------------------------------- GET ALL USER
// need: nothing
export const getAllUser = async (_, res) => {
  const db = await getDb();
  const allUser = await db.collection(process.env.DB_COL_USER).find({}).toArray();
  res.json(allUser);
};

// ---------------------------------------- GET USER
// need: body.userId
export const getUser = async (req, res) => {
  const db = await getDb();
  const user = await db
    .collection(process.env.DB_COL_USER)
    .findOne({ _id: new ObjectId(req.body.userId) });
  res.json(user);
};

// ---------------------------------------- LOGOUT USER
// need: nothing
export const logoutUser = async (_, res) => {
  res.clearCookie("token");
  res.end();
};

// ---------------------------------------- ADD(register) USER
// need: body.email / body.password
export const addUser = async (req, res) => {
  const db = await getDb();
  const checkEmail = await db
    .collection(process.env.DB_COL_USER)
    .findOne({ email: req.body.email });
  if (checkEmail) return res.json({ error: "E-Mail exists!" });
  const addUserResult = await db.collection(process.env.DB_COL_USER).insertOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthday: req.body.birthday,
    email: req.body.email,
    password: req.body.password,
    regdate: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
  });
  res.json(addUserResult);
};

// ---------------------------------------- LOGIN USER
// need: body.email / body.password
export const loginUser = async (req, res) => {
  const db = await getDb();
  const loginUserResult = await db
    .collection(process.env.DB_COL_USER)
    .findOne({ email: req.body.email, password: req.body.password });
  if (!loginUserResult) res.status(401).end();
  else {
    const token = createToken(loginUserResult);
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
    res.end();
  }
};

// ---------------------------------------- EDIT USER EMAIL
// need: body.email / body.userId
export const editUser = async (req, res) => {
  const db = await getDb();
  const checkEmail = await db
    .collection(process.env.DB_COL_USER)
    .findOne({ email: req.body.email });
  if (checkEmail) return res.json({ error: "E-Mail exists!" });
  const editUserResult = await db
    .collection(process.env.DB_COL_USER)
    .updateOne({ _id: new ObjectId(req.body.userId) }, { $set: { email: req.body.email } });
  res.json(editUserResult);
};

// ---------------------------------------- DELETE USER
// need: body.userId / body.password
export const deleteUser = async (req, res) => {
  const db = await getDb();
  const deleteUserResult = await db
    .collection(process.env.DB_COL_USER)
    .deleteOne({ _id: new ObjectId(req.body.userId), password: req.body.password });
  res.json(deleteUserResult);
};
