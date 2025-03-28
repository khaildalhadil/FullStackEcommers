// @DESC admin all item
// @ROUTE GET api/admin/allItem
// @ACCESS private 

import Items from "../models/Items.js";
import User from "../models/userScham.js";

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
import multer from 'multer';
import sharp from 'sharp';

const multerStorageitem = multer.memoryStorage();

// fileter to only user can download img
const multerFilter = (req, file, cb) => {
  // in mimetype will know if it is img, doc or video ect
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type"), false)
  }
}

const upload = multer({
  storage: multerStorageitem,
  fileFilter: multerFilter
});

export const uploadItemPhoto = upload.single('itemImg')

export const resizeItemPhoto = (req, res, next) => {
  if (!req.file) return next();
  // to send it to next middleware
  req.file.filename = `item-${Date.now()}.jpeg`
  
  sharp(req.file.buffer)
  //  width & hight
  .resize(500, 500)
  // conver to jpg
  .toFormat('jpeg')
  .jpeg({quality: 90})
  // convet from buffer to file
  .toFile(`public/img/items/${req.file.filename}`)

  next();
};

export async function createitem(req, res, next) {
  
  
  try {
    const {itemName, itemPrice, itemDis, itemColor, itemCount, itemImg
    } = req.body;
    

    const newItem = await Items.create({
      itemName,
      itemPrice, 
      itemDis,
      itemColor,
      itemCount,
      itemImg
    });

    res.status(200).json({status: 'success', message: 'new item added seccess', newItem})

  } catch(err) {
    res.status(400).json({status:'fall', message: err.message, allMessage: err})
  }
}

export const uploadItemPhotos = upload.array('itemImg', 4);

// export const resizeItemPhotos = (req, res, next) => {
//   console.log(req.files);
//   if (!req.files) return res.status(404).json({status: 'full', message: 'no files is downloaded'});

//   // req.files.files = 
// }
  
export async function updateItemForAdmin(req, res, next) {

  const {
    itemName, 
    itemPrice, 
    itemDis, 
    itemColor, 
    itemCount,
    itemImg
  } = req.body.updateData

  try {
    
    const updatedItem = await Items.findByIdAndUpdate({_id: req.body.itemId}, {
      itemName, 
      itemPrice, 
      itemDis, 
      itemColor, 
      itemCount,
      itemImg
    }, {new: true, runValidators: true})

    // await updatedItem.save();
    res.status(200).json({status: 'success', message: 'item update seccess', updatedItem})

  } catch(err) {
    res.status(401).json({status: 'full', message: err.message, allError: err})
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



export async function getOneItemForAdmin(req, res, next) {
  try {
    const id = req.body.id;
    const getOneItem = await Items.findById({_id: id});
    res.status(200).json({status: 'success', getOneItem})

  } catch(err) {
    res.status(400).json({status:'fall', message: err.message, allMessage: err})
  }
}

export async function getAllUsers(req, res, next) {
  try {
    // console.log(req.query)
    const page = Number(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    
    const startIndex = ( page - 1 ) * limit;
    const total = await User.countDocuments();

    const allUser = await User.find().skip(startIndex).limit(limit);
    
    res.status(200).json({message: 'success', allUser, page, limit, total, pages: Math.ceil(total / limit)})

  } catch(err) {
    res.status(400).json({status:'fall', message: err.message, allMessage: err})
  }
}

