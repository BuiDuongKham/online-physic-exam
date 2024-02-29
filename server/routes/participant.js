const express = require("express");
const {
  addUserToContest,
  getAddedContest,
} = require("../controllers/participant");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");

router.patch(
  "/addUser/:contestId",
  requireAuth.isHostOrAdmin,
  addUserToContest
);
router.get("/:userId", getAddedContest);

module.exports = router;
