import Order from "../models/order.js";

export async function getAllOrder(req, res, next) {

  try {

    const allOrder = await Order.find().populate({
      path: 'user',
      select: '-__v -passwordRestToken -passwordChangedAt'
    });
    res.status(200).json({length: allOrder.length, status: 'success', allOrder})
    
  } catch(err) {
    res.status(400).json({status: 'fall'})
  }
}

export async function newOrder(req, res, next) {
  try {
    const {userWithitems} = req.body;
    const userOrder = await Order.create(userWithitems);
    res.json({status: 'scueess', message: 'added order to database', userOrder})
  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allError: err})
  }
}

export async function getOneOrder(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findOne({_id: orderId})
    res.status(200).json({status: 'success', order})
  } catch(err) {
    res.json({status: 'fall', error: err.message, allError: err});
  }
}
