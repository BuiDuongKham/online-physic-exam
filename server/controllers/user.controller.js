const user = require("../models/user");

const addRoleForUser = async (req, res) => {
  try {
    const { role } = req.body;
    const result = await user.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { role } },
      { new: true, projection: { password: 0 } }
    );
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const result = await user.findByIdAndDelete(req.params.userId);
    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await user
      .find({ _id: { $ne: req.params.userId } })
      .select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.find().select("-password -role");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
module.exports = {
  addRoleForUser,
  deleteUser,
  getAllUsers,
  getUsers,
};
