const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("basic").readOwn("profile").updateOwn("profile").readOwn("product");

  ac.grant("business").extend("basic").readAny("product").readAny("profile");

  ac.grant("admin")
    .extend("basic")
    .extend("business")
    .updateAny("profile")
    .createAny("profile")
    .deleteAny("profile");

  return ac;
})();
