import express from "express";
import passport from "passport";
import session from "express-session";
import morgan from "morgan";
import db from "./models/Entry.js";
import bodyParser from "body-parser";
import { config } from "dotenv";
import router from "./routes/userRoute.js";
import cors from "cors";

config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(morgan("dev"));
app.use("/attendance", router);
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
