const store = require("./store");

const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function signup(username, password, role) {
  if (!username || !password)
    throw new Error("Username or password are not defined");
  try {
    const hashedPassword = await hashPassword(password);

    return await store.createUser({
      username,
      hashedPassword,
      role,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function login(username, password) {
  if (!username || !password)
    throw new Error("Username or password are not defined");
  try {
    const user = await store.findAndUpdateUser(username, password);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getById(userId) {
  try {
    return await store.getById(userId);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  signup,
  login,
  getById,
};
