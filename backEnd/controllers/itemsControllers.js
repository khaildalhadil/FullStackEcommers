import Comment from '../models/CommentScham.js';
import Items from '../models/Items.js';

export async function createitem(req, res, next) {
  
  try {
    
    const {itemName, itemImg, itemPrice, createDate, itemDis, itemsStars, ratingsAverage} = req.body;
    // console.log(req.body);
    const newItem = await Items.create({
      itemName,
      itemsStars,
      itemImg, 
      ratingsAverage,
      itemPrice, 
      createDate, 
      itemDis, 
    })

    // await newItem.save();
    res.status(200).json({status: 'success', message: 'new item added seccess', newItem})

  } catch(err) {
    res.status(400).json({status:'fall', message: err.message, allMessage: err})
  }
}

export async function deleteItem(req, res, next) {
  try {

    const itemId = req.body.id;
    const deletedItem = await Items.findByIdAndDelete({_id: itemId})
    res.status(204).json({status: 'success', message: 'item deleted seccess', deletedItem})

  } catch(err) {
    res.status(404).json({status:'fall', message: err.message, allMessage: err})
  }
}

export async function updateItem(req, res, next) {
  
  try {
    const {
      itemName, itemsStars, itemImg, 
      ratingsAverage, itemPrice, createDate, 
      itemDis, itemId} = req.body
    
    const updatedItem = await Items.findByIdAndUpdate({_id: itemId}, {
      itemName, itemsStars, itemImg, 
      ratingsAverage, itemPrice, createDate, 
      itemDis, itemId
    }, {new: true, runValidators: true})

    res.status(200).json({status: 'success', message: 'item update seccess', updatedItem})

  } catch(err) {
    res.status(401).json({status: 'full', message: err.message, allError: err})
  }
}

export async function getAllItems(req, res, next) {

  try {
    
    const allItems = await Items.find();

    res.status(200).json({
      status: 'success', 
      length: allItems.length,
      data: allItems
    })

  } catch(err) {
    res.status(500).json({status: 'full', message: err.message, allError: err})
  }
}


export async function getOneItem(req, res, next) {
  try {

    const id = req.params.id;
    const item = await Items.findById({_id: id}).populate('comments');
    res.status(200).json({status: 'success', item})

  } catch(err) {
    res.json({status: 'fall', error: err.message, allError: err});
  }
}

export async function updateCommentId(req, res, next) {
  try {
    const {id} = req.params;
    const user = await Items.findOneAndUpdate(
      {
        _id: id
      }, {
        "$addToSet": {commentId: req.body.commentId}
      }
    );
    res.status(200).json({status: 'success', user, message: `${req.body.commentId} has been added to comment item list`});
  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allMessageError: err})
  }
}
