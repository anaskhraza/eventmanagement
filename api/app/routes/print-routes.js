import express from "express";
import path from "path";
import PrintController from "../controllers/PrintController";

const router = express.Router();

const printController = new PrintController();

router.post("/print", printController.printPDF);
module.exports = router;