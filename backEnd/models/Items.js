import mongoose from "mongoose";

const itemsSchima = new mongoose.Schema({
  itemName: {
    type: String,
  },
  itemImg: {
    type: String
  },
  itemPrice: {
    type: Number,
  },
  createDate: {
    type: Date,
    default: Date.now(),
  },
  itemColor: {
    type: String
  },
  itemCount: {
    type: Number,
  },
  itemDis: {
    type: String,
  },


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