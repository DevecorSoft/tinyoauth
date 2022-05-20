const { Base64 } = require("js-base64");

exports.clientIdentifierSupplier = {
  generate_cid: (d) => Base64.encode(JSON.stringify(d)),
  generate_secret: () => "",
};
