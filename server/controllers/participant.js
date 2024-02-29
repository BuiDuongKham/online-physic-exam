const User = require("../models/user");
const Contest = require("../models/contest");
const testResults = require("../models/testResults");

const addUserToContest = async (req, res) => {
  try {
    const { contestId } = req.params;
    const userIds = req.body;

    const contest = await Contest.findOneAndUpdate(
      { _id: contestId },
      { participant: userIds },
      { new: true }
    );

    if (!contest) {
      return res.status(404).json({ message: "Cuộc thi không tồn tại" });
    }

    res.status(200).json({
      message: "Cập nhật danh sách người dùng trong cuộc thi thành công",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getAddedContest = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing userId parameter" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    const contests = await Contest.find({ participant: { $in: [userId] } });

    const contestIds = contests.map((contest) => contest._id);

    const testResult = await testResults
      .find({ contestId: { $in: contestIds }, userId })
      .select("contestId testScores");

    const contestsWithTestResults = contests.map((contest) => {
      const result = testResult.find(
        (result) => result.contestId.toString() === contest._id.toString()
      );
      return {
        ...contest._doc,
        testResult: result ? result.testScores : null,
      };
    });

    res.status(200).json({ contests: contestsWithTestResults });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

module.exports = {
  getAddedContest,
  addUserToContest,
};
