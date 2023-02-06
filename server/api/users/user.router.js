const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { isAdmin } = require("../../auth/admin_validation");

const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  makeAdmin,
  search,
  deleteUser
} = require("./user.controller");
router.get("/", checkToken, isAdmin, getUsers);
router.post("/register", checkToken, isAdmin, createUser);
router.get("/:id", checkToken, getUserByUserId);
router.get("/admin/:id", checkToken, isAdmin, getUserByUserId);
router.post("/login", login);
router.patch("/update", checkToken, isAdmin, updateUsers);
router.patch("/make-admin", checkToken, isAdmin, makeAdmin);
router.get("/search/:keywords", checkToken, isAdmin, search);
router.delete("/delete", checkToken, isAdmin, deleteUser);

module.exports = router;
