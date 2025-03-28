import User from '../models/userScham.js';
import sendEmail from '../utils/email.js';
import {createToken, checkToekn} from '../utils/JWT.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Order from '../models/order.js';

// for upload image
import multer from 'multer';
import sharp from 'sharp';

// setting the storage and loaction of a photo

// ###### we don't need it because we need to store it in momery then 
// ###### store it in our file to make it small and with not all qulity

// const multerStorage = multer.diskStorage({
//   // cb like next in express to move to anther method with some inforation in it 

//   // i have to do two things 
//   // 1) destination to specifies the directory where the uploaded file will be save
//   destination: (req, file, cb) => {
//     // null if there is error
//     cb(null, 'public/img/users')
//   },
//   // 2) filename determines the name of the uploaded file  
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// })

// #### i do this to store it in memory then i will stor it in the file
// #### now we have the file in the req.file.buffer
// <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 05 69 00 00 03 3f 08 06 00 00 00 a3 ea 50 0f 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 
//  04 ... 338882 more bytes>
const multerStorage = multer.memoryStorage();

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
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadUserPhoto = upload.single('photo')

export const resizeUserPhoto = (req, res, next) => {
  
  if (!req.file) return next();
  // to send it to next middleware
  req.file.filename = `user-${Date.now()}.jpeg`
  
  sharp(req.file.buffer)
  //  width & hight
  .resize(500, 500)
  // conver to jpg
  .toFormat('jpeg')
  .jpeg({quality: 90})
  // convet from buffer to file
  .toFile(`public/img/users/${req.file.filename}`)

  next();
};


// check 
export async function protect(req, res, next) {

  try {

    let token;
    // bring it from the browser
    token = req.body.jwt;
    // 1) check if user login or register to get tokin from him/her
    if (!token) return res.status(401).json({status: 'fall', message: 'you are not authorized to access login or register first ...'});

    // 2) check if token is right or it is fick or not right 
    const decodedTheToken = checkToekn(token);
    
    // 3) check if the user still exists get id from token
    const userIdFromToken = decodedTheToken.useId;

    const user = await User.findOne({_id: userIdFromToken}).populate({
      path: 'orderID',
      model: Order
    });

    if (!user) return res.status(401).json({status: 'fall', message: 'you are not authorized to access login or register first ...'});
    
    req.user = user;

    next();
  } catch(err) {
    res.status(401).json({errorMessage: err.message, allError: err})
  } 
}

// @DESC register or sinup / add new user
// @ROUTE /signup
// @ACCESS private for user

export async function Register(req, res) {
  try {

    const {name, email, password, passwordConfirm} = req.body;
    const newUser = await User.create({name, email, password, passwordConfirm})
    const token = createToken({useId: newUser._id});
    res.status(201).json({status: 'sussecc', message: 'create new user', token, data: {user: newUser}})

  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allError: err})
  }
}

// @Desc Login For User
// @route /login
// @access private/Admin
export async function Login(req, res) {

  const {email, password} = req.body;

  try {
    // check email if we have it
    const findUser = await User.findOne({email}).select('+password');
    if (!findUser) return res.status(404).json({status: 'fall', message: 'email or password are wrong'});
    
    if (!password) return res.status(401).json({status: 'fall', message: 'email or password are wrong'});
  
    const currUserPassword = findUser.password;
    const checkIfSeemPassword = await bcrypt.compare(password, currUserPassword);
  
    if (!checkIfSeemPassword) return res.status(401).json({status: 'fall', message: 'email or password are wrong'});

    const token = createToken({useId: findUser._id});
  
    const cookieOption = {
      // this prevents js from accessing the cookie in the browser
      httpOnly: true,
      // cookie will send over both http and https
      // in production, it should be set to ture to enforce https only transmition
      // secure: false,
      sameSite: 'None',
      path: 'http://localhost/', // 
      // EXPIRES in 30 days
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }

    res.cookie('jwt', token, cookieOption);
    findUser.password = undefined;
    res.status(200).json({status: 'success',token , data: {user: findUser}})

  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allError: err})
  }
}

export async function restrictTo(req, res, next) {

  if (req.user.role != 'admin') {
    res.status(403).json({status: 'full', message: 'You are not authorized'})
    return 
  }
  next();
}

// @DESC  logout user / remove the tokin
// @ROUTE POST /api/user/logout
// @ACCESS Private

export async function LogOut(req, res) {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({status: 'success', message: 'logout successfully...'})
}

export async function foregotPassword(req, res, next) {

  try {
    
    // 1) get  user from poasted email
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user || !email) return res.status(404).json({status: 'Not Found', message: 'Email Not Found !!'})
      
    // 2) Generate then random rest token
    
    // create token for user url to rrest the password from it 
    const resetToken = crypto.randomBytes(32).toString('hex'); // aklsdgadhre32534234dfafds3
  
    // save hash token in database to comparet then 
    user.passwordRestToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
  
    // console.log({resetToken, hashedToken: user.passwordRestToken})
  
    // create time to end and convert to millsecond 10 min
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    
    // we need now to save what we save in our data base 
    await user.save({validateBeforeSave: false});
    
    // 3) Send it to users email
    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    // create file in utils name it email.js 
    const message = ` if you forget you password plase click this url to reset you password ${resetURL}`;
    // sendEmail({email, text: resetURL});
    try {
      await sendEmail({
        email, 
        subject: ' you have only 10 mi',
        message
      })
  
      res.status(200).json({status: "success", message: 'Token Send To Email'})
  
    } catch(err) {
      user.passwordResetExpires = undefined;
      user.passwordRestToken = undefined;
      // await user.save({validateBeforeSave: false});
      res.status(500).json({status: 'fall',message: 'There was an error sending to email. Try again later', errorMessage: err.message , allMessage: err})
    }
  } catch(err) {
    res.status(500).json({status: 'fall',message: 'There was an error sending to email. Try again later', errorMessage: err.message , allMessage: err})
  }
}

export async function ressetPassword(req, res, next) {
  try {
    
    // 1) Get user based on the token
    // I encrypt it to make it seem in my database
    const checkToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')
    
    const userFromToken = await User.findOne({
      passwordRestToken: checkToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    // 2) If token has not expired, and there is user, set the newe password
    // if we don't have user or the token has been expired it will gave as null
    // console.log(userFromToken);
    
    if (!userFromToken) return res.status(400).json({message: 'Token is invalid or has expired'});
    
    // 3) Update changedPasswordAt property for the user
    userFromToken.password = req.body.password;
    userFromToken.passwordConfirm = req.body.passwordConfirm;
    userFromToken.passwordResetExpires = undefined;
    userFromToken.passwordRestToken = undefined;
    await userFromToken.save();
    
    // 4) Log the use in, send JWT
    const token = createToken({useId: userFromToken._id});
    res.status(200).json({status: 'success', token, data: {user: userFromToken}})
  } catch(err) {
    res.status(500).json({status: 'fall', errorMessage: err.message , allMessage: err})
    
  }
}