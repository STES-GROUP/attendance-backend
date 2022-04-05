import express from "express";
// import db from "./database/database";
import db from "./models/User";
import bodyParser from "body-parser";

const app = express();

const PORT = 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to NEW attendance",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "route not found" });
});

app.use((error, req, res, next) => {
  res.status(500).json({
    error: error.message,
    next,
  });
});

db.sequelize.sync({ alter: false }).then(() => {
  console.log("Database Connected!");
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
});

export default app;
