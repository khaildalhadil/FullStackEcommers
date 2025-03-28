import express from 'express';
import { createitem, deleteItem, getAllItems, getAllUsers, getOneItemForAdmin, resizeItemPhoto, updateItemForAdmin, uploadItemPhoto } from '../controllers/admin-controllers.js';
import { protect, restrictTo } from '../controllers/authContollers.js';
const routes = express.Router();

routes
  .route('/api/admin/item')
  .post(protect, restrictTo, getAllItems)
  // .patch(protect, restrictTo, updateItem)
  
routes
  .route('/api/admin/createItem')
  // .post(uploadItemPhoto, resizeItemPhoto, createitem)
  .post(protect, restrictTo, uploadItemPhoto, resizeItemPhoto, createitem)
  
  
routes
  .route('/api/admin/deleteItem')
  .post(protect, restrictTo, deleteItem)

routes
  .route('/admin/item/getOneItem')
  .post(protect, restrictTo, getOneItemForAdmin)

routes.patch('/admin/item/updateItem', protect, restrictTo, updateItemForAdmin)
routes.post('/admin/view/users', protect, restrictTo, getAllUsers)

export default routes