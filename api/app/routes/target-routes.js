import express from "express";
import path from "path";
import passport from "passport";
import TargetController from "../controllers/TargetController";
import UserController from "../controllers/UserController";
require("../config/passport")(passport);
const router = express.Router();

const targetController = new TargetController();
const userController = new UserController();
// declare routes

router.get(
  "/year/:year",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  targetController.fetchAllTargets
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  targetController.fetchTarget
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  targetController.createTarget
);
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  targetController.deleteTarget
);
router.post(
  "/createBulkTarget",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  targetController.createBulkTarget
);

module.exports = router;
