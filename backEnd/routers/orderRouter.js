import express from "express";
import { getAllOrder, getOneOrder, newOrder } from "../controllers/orderControllers.js";
const orderRouter = express.Router();

// router
//   .route('/order')

orderRouter.get('/order/:orderId', getOneOrder)
orderRouter.post('/order/new', newOrder)
orderRouter.get('/admin/allOrder', getAllOrder)

export default orderRouter;
