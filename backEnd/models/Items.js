import mongoose from "mongoose";

const itemsSchima = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemImg: {
    type: [String]
  },
  itemPrice: {
    type: Number,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  itemsStars: Number,
  itemDis: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
    default: 1,
    min: [1, 'Rating must be above 1.0'],
    min: [5, 'Rating must be below 5.0'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  }
},{
  toJSON: {virtuals: true},
  toObject: {virtuals: true},
})

itemsSchima.virtual('comments', {
  ref: 'Comment',
  foreignField: 'item',
  localField: '_id'
})

export default mongoose.model('Items', itemsSchima);