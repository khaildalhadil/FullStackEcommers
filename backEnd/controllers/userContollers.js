import Order from "../models/order.js";
import User from "../models/userScham.js";

export async function updateOrderToUser(req, res, next) {
  try {
    const {id} = req.params;
    const user = await User.findOneAndUpdate(
      {
        _id: id
      }, {
        "$addToSet": {orderID: req.body.orderId}
      }
    );
    res.status(200).json({status: 'success', user, message: `${req.body.orderId} has been added to user order list`});
  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allMessageError: err})
  }
}

export async function getUser(req, res, next) {
  try {

    const id = req.params.id
    const user = await User.findById({_id: id}).populate({
      path: 'orderID',
      model: Order
    });
    res.status(200).json({status: 'success', user})

  } catch(err) {
    res.status(400).json({errorMessage: err.message, allError: err});
  }
}