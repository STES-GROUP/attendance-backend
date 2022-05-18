import express from "express";
import UserAuth from "../controllers/user.js";
import UserCard from "../controllers/card.js";
import UserEntry from "../controllers/entries.js";
import Validation from "../middlewares/validations.js";
import checkLogin from "../middlewares/checkLogin.js";

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
usersRouter.get("/all/users", UserAuth.getAllUsers);
usersRouter.patch("/update",  UserAuth.update);
usersRouter.delete("/delete", UserAuth.delete);
usersRouter.get("/search",UserAuth.SearchUsers )
export default usersRouter;
