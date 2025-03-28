import e from "express";
import Comment from "../models/CommentScham.js";
import { 

  getAllItems, 
  getOneItem, 
  updateCommentId,
} from "../controllers/itemsControllers.js";

const itmersRouter = e.Router();

itmersRouter
  .route('/items')
  .get(getAllItems)

itmersRouter
  .route('/item/:id')
  .get(getOneItem)
  .patch(updateCommentId)



export default itmersRouter;