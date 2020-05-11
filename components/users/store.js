const Model = require("./model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

async function createUser({ username, hashedPassword, role }) {
  const user = await Model.findOne({ username });
  if (user) throw new Error("This user already exists");

  const newUser = new Model({
    username,
    password: hashedPassword,
    role: role || "basic",
  });

  const accessToken = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "6w",
    }
  );

  newUser.accessToken = accessToken;

  return await newUser.save();
}

async function findAndUpdateUser(username, password) {
  const user = await Model.findOne({ username });
  const validPassword = await validatePassword(password, user.password);

  if (!user || !validPassword)
    throw new Error("Username or password don't match");

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "6w",
  });
  return await Model.findByIdAndUpdate(user._id, { accessToken });
}

async function getUser(username) {
  const user = await Model.findOne({ username });
  return user;
}

async function getById(userId) {
  const user = await Model.findById(userId);

  return user;
}

module.exports = {
  createUser,
  findAndUpdateUser,
  getUser,
  getById,
};
