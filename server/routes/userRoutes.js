const express = require("express");
const {
  addRoleForUser,
  deleteUser,
  getAllUsers,
  getUsers,
} = require("../controllers/user.controller");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();

router.get("/", requireAuth.isHostOrAdmin, getUsers);
router.patch("/updateRole/:userId", requireAuth.isAdmin, addRoleForUser);
router.delete("/deleteUser/:userId", requireAuth.isAdmin, deleteUser);
router.get("/getAll/:userId", requireAuth.isAdmin, getAllUsers);

module.exports = router;
