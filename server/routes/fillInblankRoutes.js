// const express = require("express");
// const multer = require('multer');
// const fs = require('fs');

// const upload = multer({
//     dest: 'uploads/',
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype === 'image/png') {
//         cb(null, true);
//       } else {
//         cb(new Error('Only PNG files are allowed'));
//       }
//     },
//   });

// const requireAuth = require("../middlewares/requireAuth");
// const { createContest, deleteContest } = require("../controllers/contest");
// const { createFillInBlankQuest, deleteFillInBlankQuest } = require("../controllers/follInblank");
// const { createMcqQuest, deleteMcqQuest } = require("../controllers/mcqQuest");
// const router = express.Router();

// router.post("/create", requireAuth.isHost, createContest);
// router.delete("/:contestId", requireAuth.isHost, deleteContest);
// router.post("/:contestId/fillInBlankQuest", upload.single('image'), requireAuth.isHost, createFillInBlankQuest)
// router.delete("/:contestId/fillInBlankQuest/:fillInBlankQuestId",requireAuth.isHost, deleteFillInBlankQuest)
// router.post("/:contestId/mcqQuest", requireAuth.isHost, createMcqQuest)
// router.delete("/:contestId/mcqQuest/:mcqQuestId",requireAuth.isHost, deleteMcqQuest)

// module.exports = router;
