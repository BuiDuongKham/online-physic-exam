const express = require("express");
const multer = require("multer");
const fs = require("fs");

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only PNG files are allowed"));
    }
  },
});

const requireAuth = require("../middlewares/requireAuth");
const {
  createContest,
  deleteContest,
  getContestById,
  getAllContest,
  getTestDetail,
  getAllContestDetail
} = require("../controllers/contest");
const {
  createFillInBlankQuest,
  deleteFillInBlankQuest,
  updateFillInBlankQuest,
} = require("../controllers/follInblank");
const {
  createMcqQuest,
  deleteMcqQuest,
  updateMcqQuest,
} = require("../controllers/mcqQuest");

const router = express.Router();

// Contest routes
router.get("/getAllDetail", requireAuth.isHostOrAdmin, getAllContestDetail);
router.get("/getAll", requireAuth.isHostOrAdmin, getAllContest);
router.get("/:contestId", requireAuth.isHostOrAdmin, getContestById);
router.post("/create", requireAuth.isHostOrAdmin, createContest);
router.delete("/:contestId", requireAuth.isHostOrAdmin, deleteContest);

// Fill-in-Blank Question routes
router.post(
  "/:contestId/fillInBlankQuest",
  upload.single("image"),
  requireAuth.isHostOrAdmin,
  createFillInBlankQuest
);
router.patch(
  "/fillInBlankQuest/update/:fillInBlankQuestId",
  upload.single("image"),
  requireAuth.isHostOrAdmin,
  updateFillInBlankQuest
);
router.delete(
  "/:contestId/fillInBlankQuest/:fillInBlankQuestId",
  requireAuth.isHostOrAdmin,
  deleteFillInBlankQuest
);

// Multiple Choice Question routes
router.post(
  "/:contestId/mcqQuest",
  upload.single("image"),
  requireAuth.isHostOrAdmin,
  createMcqQuest
);
router.patch(
  "/mcqQuest/update/:mcqId",
  upload.single("image"),
  requireAuth.isHostOrAdmin,
  updateMcqQuest
);
router.delete(
  "/:contestId/mcqQuest/:mcqQuestId",
  requireAuth.isHostOrAdmin,
  deleteMcqQuest
);

// Other routes
router.get("/getTest/:contestId", getTestDetail);

module.exports = router;
