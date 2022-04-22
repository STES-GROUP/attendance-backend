import express from "express";
import UserAuth from "../controllers/user";
import UserCard from "../controllers/card";
import UserEntry from "../controllers/entries";
import Validation from "../middlewares/validations";
import checkLogin from "../middlewares/checkLogin";

const usersRouter = express.Router();
usersRouter.post("/signup", Validation.userValidation, UserAuth.signup);
usersRouter.post("/login", Validation.loginValidation, UserAuth.login);
usersRouter.post("/card", UserCard.createCard);
usersRouter.get("/allCards", UserCard.allCards);
usersRouter.get("/entry", UserEntry.createEnties);
usersRouter.get(
  "/all-entries/:ClassIdentifier",
  checkLogin,
  UserEntry.allEntries
);
usersRouter.post("/access/add", UserEntry.registerAccess);
usersRouter.get("/view-access/:view", UserEntry.accessInfo);
usersRouter.post("/register/class", UserEntry.createClass);
usersRouter.get("/all/class", UserEntry.allClasses);
export default usersRouter;
