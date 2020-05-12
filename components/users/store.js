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
  // Sign Token
  const accessToken = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "6w",
    }
  );
  // add token to the newUser model
  newUser.accessToken = accessToken;

  return await newUser.save();
}

async function findAndUpdateUser(username, password) {
  const user = await Model.findOne({ username });
  const validPassword = await validatePassword(password, user.password);

  if (!user || !validPassword)
    throw new Error("Username or password don't match");
  // change token with login
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "6w",
  });
  return await Model.findByIdAndUpdate(
    user._id,
    { accessToken },
    { projection: { username: 1, _id: 1, accessToken: 1 } }
  );
}

async function getById(userId) {
  const user = await Model.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
}

module.exports = {
  createUser,
  findAndUpdateUser,
  getById,
};
