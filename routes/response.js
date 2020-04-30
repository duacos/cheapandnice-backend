// the main purpose of this file is to handle all kinds of responses
// every response goes through response -> controller -> model

const { handleUsers, handleCookies } = require("./controller");

/* 
  The response.body could be anything (e.g a list [] , a single object {})  
  therefore we filter out unnecessary components (users, cookies... etc)
*/
exports.success = function (req, res, { data, model, filter, status }) {
  try {
    switch (model) {
      case "users":
        return handleUsers(req, res, data, filter, status);
      case "cookies":
        return handleCookies(req, res, data, filter, status);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.error = function (req, res, message, details, status) {
  console.log("[reason]: ", details);
  res.status(status || 500).send({
    error: details,
    body: "",
  });
};
