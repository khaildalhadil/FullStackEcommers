import Comment from "../models/CommentScham.js";
import User from "../models/userScham.js";

export async function getAllComment(req, res, next) {
  try {
    
    const allComment = await Comment.find();
    res.status(200).json({status: "success", length: allComment.length, data: {allComment}})
    
  } catch(err) {
    res.status(400).json({status: "fall", errMessage: err.message, allMessageError: err})
  }
}

export async function createComment(req, res, next) {
  try {

    const {comment, rating, item, user} = req.body;
    const newComment = await Comment.create({comment, rating, item, user})
    res.status(201).json({status: "success", message: 'create comment success', newComment})

  } catch(err) {
    res.status(500).json({status: "fall", errMessage: err.message, allMessageError: err})
  }
}