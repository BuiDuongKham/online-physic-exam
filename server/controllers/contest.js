const contest = require("../models/contest");
const fillInBlankQuest = require("../models/fillInBlank");
const mcqQuest = require("../models/mcqQuest");
const user = require("../models/user")
const result = require("../models/testResults")


const createContest = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, hostId } = req.body;
    const contestExists = await contest.exists({ title: title.toLowerCase() });
    if (contestExists) {
      return res.status(409).send("title already in use.");
    }
    const contestDoc = {
      title: title,
      description: description,
      hostId: hostId,
    };
    const newContest = await contest.create(contestDoc);
    if (newContest) {
      return res
        .status(200)
        .json({ contest: newContest, message: "create contest successfully" });
    } else {
      return res.status(500).send("Error occurred. Please try again");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const deleteContest = async (req, res) => {
  try {
    const { contestId } = req.params;

    const oldContest = await contest.findById(contestId);
    if (!oldContest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    await fillInBlankQuest.deleteMany({
      _id: { $in: contest.fillInBlankQuests },
    });

    await mcqQuest.deleteMany({ _id: { $in: contest.mcqQuests } });

    await contest.findOneAndDelete({ _id: contestId });

    return res.status(200).json({
      success: true,
      message: "Contest and associated questions deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getAllContestDetail = async (req, res) =>
{
  try {
    // get all contest, participants taking the contest, and the result of the contest
    const contests = await contest.find();
    const contestsDetail = [];
    for (let i = 0; i < contests.length; i++) {
      const contestId = contests[i]._id;
      const contestTitle = contests[i].title;
      const participants = contests[i].participant;
      const userResults = [];
      for (const participant of participants) {
        const scoresResult = await result.find(
          {
            contestId: contestId,
            userId: participant
        })
        const scoreResult = scoresResult[0]
        const userResult = await user.findById(
          participant
        )
        userResults.push(
          {
            username: userResult.username,
            result: scoreResult.testScores
          }
        )
      }
      // sort by result decreasingly
      userResults.sort((a, b)=>{ return b.result - a.result})

      contestsDetail.push(
        {
          contestTitle,
          userResults
        }
      )
    }
    return res.status(200).json({ success: true, data: contestsDetail });
  } catch (e) {
  }
}

const getContestById = async (req, res) => {
  try {
    const { contestId } = req.params;
    const Contest = await contest
      .findById(contestId)
      .populate("fillInBlankQuests")
      .populate({ path: "mcqQuests" });
    if (!Contest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    return res.status(200).json({ success: true, data: Contest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getTestDetail = async (req, res) => {
  try {
    const { contestId } = req.params;
    const Contest = await contest
      .findById(contestId)
      .populate({
        path: "mcqQuests",
        select: "-correctOption -createdAt -updatedAt",
      })
      .populate({ path: "fillInBlankQuests", select: "-createdAt -updatedAt" });
    if (!Contest) {
      return res
        .status(404)
        .json({ success: false, message: "Contest not found" });
    }

    return res.status(200).json({ success: true, data: Contest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getAllContest = async (req, res) => {
  try {
    const contests = await contest.find();
    return res.status(200).json({ success: true, data: contests });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
module.exports = {
  createContest,
  deleteContest,
  getContestById,
  getAllContest,
  getTestDetail,
  getAllContestDetail
};
