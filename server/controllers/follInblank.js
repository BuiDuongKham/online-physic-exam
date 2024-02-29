const Contest = require("../models/contest");
const FillInBlankQuest = require("../models/fillInBlank");
const fs = require("fs");

const createFillInBlankQuest = async (req, res) => {
  try {
    const { contestId } = req.params;
    const { question, lowerBound, upperBound } = req.body;

    const oldContest = await Contest.findById(contestId);
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

    const newFillInBlankQuest = await FillInBlankQuest.create({
      contestId,
      question,
      lowerBound,
      upperBound,
      imageBase64,
    });

    oldContest.fillInBlankQuests.push(newFillInBlankQuest._id);
    await oldContest.save();

    return res.status(200).json({
      success: true,
      message: "FillInBlankQuest created successfully",
      data: newFillInBlankQuest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const deleteFillInBlankQuest = async (req, res) => {
  try {
    const { contestId, fillInBlankQuestId } = req.params;

    const oldContest = await Contest.findById(contestId);
    if (!oldContest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    const oldFillInBlankQuest = await FillInBlankQuest.findById(
      fillInBlankQuestId
    );
    if (!oldFillInBlankQuest) {
      return res
        .status(404)
        .json({ success: false, message: "FillInBlankQuest not found" });
    }

    const index = oldContest.fillInBlankQuests.indexOf(fillInBlankQuestId);
    if (index > -1) {
      oldContest.fillInBlankQuests.splice(index, 1);
    }

    await oldContest.save();

    await FillInBlankQuest.findByIdAndDelete(fillInBlankQuestId);

    return res.status(200).json({
      success: true,
      message: "FillInBlankQuest deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getFillInBlankQuestById = async (req, res) => {
  try {
    const { id } = req.params;

    const fillInBlankQuestData = await FillInBlankQuest.findById(id);
    if (!fillInBlankQuestData) {
      return res
        .status(404)
        .json({ success: false, message: "FillInBlankQuest not found" });
    }
    return res.status(200).json({ success: true, data: fillInBlankQuestData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const updateFillInBlankQuest = async (req, res) => {
  try {
    const { fillInBlankQuestId } = req.params;
    const { question, lowerBound, upperBound, isImageBase64 } = req.body;
    let data = {};
    let imageBase64 = null;

    if (req.file) {
      const imageBuffer = fs.readFileSync(req.file.path);
      imageBase64 = imageBuffer.toString("base64");
      fs.unlinkSync(req.file.path);
    }

    if (isImageBase64 === true) {
      data = { question, lowerBound, upperBound };
    } else {
      data = { question, lowerBound, upperBound, imageBase64 };
    }

    const updatedFillInBlankQuest = await FillInBlankQuest.findOneAndUpdate(
      { _id: fillInBlankQuestId },
      { $set: data },
      { new: true }
    );

    if (!updatedFillInBlankQuest) {
      return res
        .status(404)
        .json({ success: false, message: "FillInBlankQuest not found" });
    }

    return res.status(200).json({
      success: true,
      message: "FillInBlankQuest updated successfully",
      data: updatedFillInBlankQuest,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

module.exports = {
  createFillInBlankQuest,
  deleteFillInBlankQuest,
  getFillInBlankQuestById,
  updateFillInBlankQuest,
};
