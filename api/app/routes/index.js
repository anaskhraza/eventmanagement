const express = require("express");

const productRoutes = require("./product-routes");
const orderRoutes = require("./order-routes");
const customerRoutes = require("./customer-routes");
const categoryRoutes = require("./category-routes");
const targetRoutes = require("./target-routes");
const draftRoutes = require("./draft-routes");
const userRoutes = require("./user-routes");
const printRoutes = require("./print-routes");
const backupRoutes = require("./backup-routes");

const router = express.Router();

//console.log("here 2", "here");

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/category", categoryRoutes);
router.use("/targets", targetRoutes);
router.use("/customers", customerRoutes);
router.use("/drafts", draftRoutes);
router.use("/users", userRoutes);
router.use("/prints", printRoutes);
router.use("/backups", backupRoutes);

module.exports = router;
