import Order from "../models/order.js";
import User from "../models/userScham.js";

export async function updateOrderToUser(req, res, next) {
  try {
    const {userId} = req.body
    const user = await User.findOneAndUpdate(
      {
        _id: userId
      }, {
        "$addToSet": {orderID: req.body.orderId}
      }
    );
    res.status(200).json({status: 'success', user, message: `${req.body.orderId} has been added to user order list`});
  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allMessageError: err})
  }
}

export async function portfolio(req, res, next) {
  try {

    res.status(200).json({status: 'success', user: req.user})

  } catch(err) {
    res.status(401).json({errorMessage: err.message, allError: err});
    
  }
}

export async function updateMePhoto(req, res, next) {
  try {
    const updateMeDoc = await User.findOneAndUpdate({_id: req.body.userId}, {
    photo: `/img/users/${req.file.filename}`
    }, {new: true, runValidators: true})  
    res.status(200).json({status: 'update image success', user: updateMeDoc})

  } catch(err) {
    res.status(401).json({errorMessage: err.message, allError: err});
  }
}

  

export async function updateMe(req, res, next) {

  try {

    const {name, mobile, email, address} = req.body;
    const updateMeDoc = await User.findOneAndUpdate({_id: req.user._id}, {
      name,
      email,
      mobile,
      address,
    }, {new: true, runValidators: true})

    res.status(200).json({status: 'success', user: updateMeDoc})
    
  } catch(err) {
    res.status(401).json({errorMessage: err.message, allError: err});
  }
}