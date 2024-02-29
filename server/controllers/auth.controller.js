const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if user exists
    const userExists = await User.exists({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(409).send("E-mail already in use.");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userDoc = {
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };
    // create user document and save in database
    const user = await User.create(userDoc);

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
        username: user.username,
        role: user.role,
      },
      "JWT_SECRET",
      {
        expiresIn: "15d",
      }
    );

    if (user) {
      return res.status(200).json({
        userDetails: {
          _id: user._id,
          email: user.email,
          token: token,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      return res.status(500).send("Error occurred. Please try again");
    }
  } catch (error) {
    return res.status(500).send("Error occurred. Please try again", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).send("Invalid credentials. Please try again");
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(400).send("Invalid credentials. Please try again");
    }

    // send new token
    const token = jwt.sign(
      {
        userId: user._id,
        email,
        username: user.username,
        role: user.role,
      },
      "JWT_SECRET",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      userDetails: {
        _id: user._id,
        email: user.email,
        token: token,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = {
  login,
  register,
};
