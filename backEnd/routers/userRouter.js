import e from "express";
import { portfolio, updateMe, updateMePhoto, updateOrderToUser } from "../controllers/userContollers.js";
import { protect, resizeUserPhoto, uploadUserPhoto } from "../controllers/authContollers.js";
const router = e.Router();

// for upload image
// import multer from 'multer';
// const upload = multer({dest: 'public/img/users'});

router.patch('/user/addOrderToUser', protect, updateOrderToUser)
router.post('/user/portfolio', protect, portfolio);
router.patch('/user/updateMe', protect, updateMe);
router.post('/user/updateMePhoto', uploadUserPhoto, resizeUserPhoto, updateMePhoto)

export default router;