const { userModel, productModel } = require("./model");

module.exports.handleUsers = (req, res, data, filter, status) => {
  res.cookie("session", data.accessToken, {
    secure: false,
    httpOnly: true,
    sameSite: true,
  });

  res.status(status || 200).send({
    error: "",
    body: userModel(data, filter),
  });
};

module.exports.handleCookies = (req, res, data, filter, status) => {
  res.clearCookie("session");

  res.status(status || 200).send({
    error: "",
    body: userModel(data, filter),
  });
};

module.exports.handleProducts = (req, res, data, filter, status) => {
  res.status(status || 200).send({
    error: "",
    body: productModel(data, filter),
  });
};
