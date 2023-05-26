const FRONTEND_LINKS = require("../../constants/frontend");

function allowCORS(req, res, next) {
  res.setHeaders("Access-Control-Allow-Origin", `${FRONTEND_LINKS.BASE_URL}`);
  res.setHeaders("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeaders("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
}

module.exports = allowCORS;
