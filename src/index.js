import http from "http";

import app from "./app";
import log from "./logger";
import db from "./models";

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(async () => {
  server.listen(PORT, () => {
    log.info(`API Server running on http://localhost:${PORT}`);
  });
});