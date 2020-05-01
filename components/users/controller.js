const store = require("./store");

const bcrypt = require("bcrypt");

const response = require("../../routes/response");
const { roles } = require("../../roles");

function grantAccess(action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles
        .can(req.user.role || res.locals.loggedInUser.role)
        [action](resource);
      if (!permission.granted) {
        response.error(
          req,
          res,
          "You don't have enough permissions",
          "Permission denied",
          401
        );
      }
      next();
    } catch (e) {
      // not actually sending errors
      return new Error(e.message);
    }
  };
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function signup(username, password, role) {
  if (!username || !password) throw new Error("Missing fields");
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
  if (!username || !password) throw new Error("Missing fields");
  try {
    const user = await store.findAndUpdateUser(username, password);
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function getUser(username, currenUser) {
  try {
    const user = await store.getUser(username);

    /* 
      if the client sends a different user, 
      nothing will happen; the same user will be returned
    */
    if (!currenUser.username) return user;
    else return currenUser;
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
  grantAccess,
  signup,
  login,
  getUser,
  getById,
};
