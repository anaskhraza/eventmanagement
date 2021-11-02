import express from "express";
import path from "path";
import UserController from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();
// declare route
//console.log("here ", "here");
router.post("/signup", userController.createUser);
router.post("/signin", userController.signIn);
module.exports = router;
