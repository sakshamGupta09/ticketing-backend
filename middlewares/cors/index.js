const FRONTEND_LINKS = require("../../constants/frontend");

function allowCORS(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `${FRONTEND_LINKS.BASE_URL}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
}

module.exports = allowCORS;
