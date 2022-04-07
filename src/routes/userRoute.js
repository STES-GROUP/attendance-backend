import express from "express";
import UserAuth from "../controllers/user";

const usersRouter = express.Router();
usersRouter.post("/signup", UserAuth.signup);
usersRouter.post("/login", UserAuth.login);

export default usersRouter;
