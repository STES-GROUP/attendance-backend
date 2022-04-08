import express from "express";
import UserAuth from "../controllers/user";
import UserCard from "../controllers/card";

const usersRouter = express.Router();
usersRouter.post("/signup", UserAuth.signup);
usersRouter.post("/login", UserAuth.login);
usersRouter.post("/card", UserCard.createCard);
usersRouter.get("/allCards", UserCard.allCards);

export default usersRouter;
