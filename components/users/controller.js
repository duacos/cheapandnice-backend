const store = require("./store");

const bcrypt = require("bcrypt");

const response = require("../../routes/response");
const { roles } = require("../../roles");

function allowIfLoggedin(req, res, next) {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      response.error(req, res, "Login first", "Permission denied", 401);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

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

async function getUser(userId, currentUser) {
  try {
    const user = await store.getUser(userId);

    /* if by any means somone manages to change the id 
    return the currentUser and not a different user */
    if (!currentUser) {
      return user;
    } else {
      return currentUser;
    }
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  allowIfLoggedin,
  grantAccess,
  signup,
  login,
  getUser,
};
