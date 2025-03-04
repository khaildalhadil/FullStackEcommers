import { foregotPassword, Login, Register, ressetPassword } from "../controllers/authContollers.js";

import e from "express";
const router = e.Router();

router.post('/signup', Register)
router.post('/login', Login)

router.post('/forgotPassword', foregotPassword);
router.patch('/resetPassword/:token', ressetPassword);


export default router;