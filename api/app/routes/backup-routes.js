import express from 'express';
import path from "path"
import BackUpController from '../controllers/BackUpController';

const router = express.Router();

const PgBackup = new BackUpController();

// declare routes 
router.get('/', PgBackup.run);


module.exports = router;