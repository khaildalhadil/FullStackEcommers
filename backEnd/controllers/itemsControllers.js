import Comment from '../models/CommentScham.js';
import Items from '../models/Items.js';

export async function createitem(req, res, next) {
  
  try {
    
    const {itemName, itemImg, itemPrice, createDate, itemDis, soldOut, itemsStars} = req.body;
    
    const newItem = await Items.create({
      itemName,
      itemsStars,
      itemImg, 
      itemPrice, 
      createDate, 
      itemDis, 
    })

    await newItem.save();
    res.status(200).json({status: 'success', message: 'new item added seccess', newItem})

  } catch(err) {
    res.json({status:'fall', message: err.message, allMessage: err})
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
