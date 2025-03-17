import e from "express";
import Comment from "../models/CommentScham.js";
import { 
  createitem, 
  deleteItem, 
  getAllItems, 
  getOneItem, 
  updateCommentId,
  updateItem
} from "../controllers/itemsControllers.js";
import { protect, restrictTo } from "../controllers/authContollers.js";

const itmersRouter = e.Router();

itmersRouter
  .route('/items')
  .post(protect, restrictTo, createitem)
  .delete(protect, restrictTo, deleteItem)
  .patch(protect, restrictTo, updateItem)
  .get(getAllItems)

itmersRouter
  .route('/item/:id')
  .get(getOneItem)
  .patch(updateCommentId)



export default itmersRouter;