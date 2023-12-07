const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy({
  customDomain: "https://a.bart0llo.dev",
  scriptName: "kielbasa",
})({});
