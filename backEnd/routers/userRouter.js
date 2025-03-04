import e from "express";
import { getUser, updateOrderToUser } from "../controllers/userContollers.js";
const router = e.Router();

router.patch('/user/addOrderToUser/:id', updateOrderToUser)
router.get('/user/orders/:id', getUser);

export default router;