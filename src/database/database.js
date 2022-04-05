import { Sequelize } from "sequelize";
const connection = {};

const sequelize = new Sequelize("attendance", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

connection.sequelize = sequelize;
connection.Sequelize = Sequelize;

export default connection;
