import express from 'express';
import path from "path"
import DraftController from '../controllers/DraftController';

const router = express.Router();
const draftController = new DraftController();
// declare route
//console.log("here ", "here");
router.get('/', draftController.fetchAllDrafts);
router.post('/create', draftController.createDraft);
router.delete('/draft', draftController.deleteDraft);
module.exports = router;