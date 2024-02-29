const contest = require("../models/contest");
const mcqQuest = require("../models/mcqQuest");
const fs = require("fs");

const createMcqQuest = async (req, res) => {
  try {
    const { contestId } = req.params;
    const { question, a, b, c, d, correctOption } = req.body;

    const oldContest = await contest.findById(contestId);
    if (!oldContest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    let imageBase64 = null;
    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageBase64 = imageBuffer.toString("base64");
      fs.unlinkSync(req.file.path);
    }

    const newMcqQuest = await mcqQuest.create({
      question,
      a,
      b,
      c,
      d,
      correctOption,
      contestId,
      imageBase64,
    });

    oldContest.mcqQuests.push(newMcqQuest._id);
    await oldContest.save();

    return res.status(200).json({
      success: true,
      message: "MCQQuest created successfully",
      data: newMcqQuest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const deleteMcqQuest = async (req, res) => {
  try {
    const { contestId, mcqQuestId } = req.params;

    const oldContest = await contest.findById(contestId);
    if (!oldContest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    // Check if the MCQQuest exists in the contest
    const oldMcqQuest = await mcqQuest.findById(mcqQuestId);
    if (!oldMcqQuest) {
      return res
        .status(404)
        .json({ success: false, message: "MCQQuest not found" });
    }

    // Remove the MCQQuest from the contest's mcqQuests array
    const index = oldContest.mcqQuests.indexOf(mcqQuestId);
    if (index > -1) {
      oldContest.mcqQuests.splice(index, 1);
    }

    await oldContest.save();

    // Delete the MCQQuest from the database
    await mcqQuest.findByIdAndDelete(mcqQuestId);

    return res
      .status(200)
      .json({ success: true, message: "MCQQuest deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getMcqQuestById = async () => {
  try {
    const { id } = req.params;

    const mcqQuestData = await mcqQuest.findById(id);
    if (!mcqQuestData) {
      return res
        .status(404)
        .json({ success: false, message: "mcqQuestData not found" });
    }
    return res.status(200).json({ success: true, data: mcqQuestData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const updateMcqQuest = async (req, res) => {
  try {
    const { mcqId } = req.params;
    const { question, a, b, c, d, correctOption, isImageBase64 } = req.body;

    let data = {};
    let imageBase64 = null;
    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageBase64 = imageBuffer.toString("base64");
      fs.unlinkSync(req.file.path);
    }

    if (isImageBase64 === true) {
      data = { question, a, b, c, d, correctOption };
    } else {
      data = { question, a, b, c, d, correctOption, imageBase64 };
    }

    // Cập nhật MCQQuest
    const updatedMcqQuest = await mcqQuest.findOneAndUpdate(
      { _id: mcqId },
      { $set: data },
      { new: true }
    );

    if (!updatedMcqQuest) {
      return res
        .status(404)
        .json({ success: false, message: "MCQQuest not found" });
    }

    return res.status(200).json({
      success: true,
      message: "MCQQuest updated successfully",
      data: updatedMcqQuest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

module.exports = {
  createMcqQuest,
  deleteMcqQuest,
  getMcqQuestById,
  updateMcqQuest,
};
