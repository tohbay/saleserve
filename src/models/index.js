"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");
const { default: log } = require("../logger");
const db = {};

log.info(config);

const sequelize = new Sequelize(
  config.default.database,
  config.default.username,
  config.default.password,
  {
    dialect: "postgres",
    host: config.default.host,
    logging: false,
    ssl: true,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

try {
  sequelize.authenticate();
  log.info(
    `Connection has been established to ${config.default.database} successfully \n`
  );
} catch (error) {
  log.info("Unable to connect to the database:", error);
}

module.exports = db;
