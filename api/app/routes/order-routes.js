import express from "express";
import path from "path";
import passport from "passport";
import OrderController from "../controllers/OrderController";
import UserController from "../controllers/UserController";
require("../config/passport")(passport);
const router = express.Router();
const orderController = new OrderController();
const userController = new UserController();
// declare route
//console.log("here ", "here");
router.get("/", orderController.fetchAllOrders);
router.get("/id/:id", orderController.fetchOneOrder);
router.get("/customerId/:id", orderController.fetchCustomerOrders);
router.get("/completed", orderController.fetchCompletedOrders);
router.get("/closed", orderController.fetchClosedOrders);

router.get(
  "/years/:year",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  orderController.fetchYearClosedOrders
);
router.get(
  "/nonClosedStats",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  orderController.fetchNonClosedOrders
);
router.get(
  "/overdueStats",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  orderController.fetchOverdueOrders
);
router.get(
  "/closedStats",
  passport.authenticate("jwt", { session: false }),
  userController.validateToken,
  orderController.fetchClosedOrders
);

router.get("/nonClosed", orderController.fetchNonClosedOrders);
router.get("/nonCompleted", orderController.fetchNonCompletedOrders);
router.get("/overdue", orderController.fetchOverdueOrders);
router.get("/void", orderController.fetchVoidOrders);

// router.get(
//   "/upcoming",
//   passport.authenticate("jwt", { session: false }),
//   userController.validateToken,
//   orderController.fetchIncomingOrders
// );
router.get("/upcoming", orderController.fetchIncomingOrders);
router.post("/create", orderController.createOrder);
router.post("/createBulkOrders", orderController.createBulkOrders);
router.put("/:id", orderController.updateOrder);
router.delete("/order", orderController.deleteOrder);
module.exports = router;
