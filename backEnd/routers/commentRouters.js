import express from 'express';
import { createComment, getAllComment } from '../controllers/commmentContollers.js';

const router = express.Router();

router.get('/getAllComment', getAllComment);
router.post('/addComment', createComment);

export default router;