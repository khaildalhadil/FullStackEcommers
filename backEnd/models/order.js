import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  location: String,
  subtotal: Number,
  total: Number,
  delivery: Number,
  createAt: {
    type: Date,
    default: Date.now,
  },
  cart: [],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

// orderSchema.pre('/^find/', function(next) {
//   this.populate({
//     path: '/order/',
//     select: '-__v -passwordRestToken -passwordChangedAt'
//   })
//   next();
// })

const Order = mongoose.model('order', orderSchema)
export default Order;