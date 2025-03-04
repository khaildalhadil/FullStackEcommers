import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    maxLength: 30,
    required: [true, "comment can't be em !!! "],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Items',
    required: [true, 'comment must belong to a item']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'comment must belong to a user']
  }

}, {
  // if we have CommentSchema.virtual we need to dipslay them 
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
});

CommentSchema.pre(/^find/, function() {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
})

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;