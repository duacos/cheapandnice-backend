/* 
  this is the model or the structure of our response 
  here we just make sure we don't expose unnecessary data the client
*/

module.exports.userModel = (payload, filter) => {
  switch (filter) {
    case "sendOne":
      return {
        username: payload.username,
        _id: payload._id,
        role: payload.role,
      };
    case "sendAll":
      return payload;

    case "destroyCookie":
      return "Successful logout";
  }
};
