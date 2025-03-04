import User from '../models/userScham.js';
import sendEmail from '../utils/email.js';
import {createToken, checkToekn} from '../utils/JWT.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// check 
export async function auth(req, res) {
  
}

export async function Register(req, res) {
  try {

    const {name, email, password, passwordConfirm} = req.body;
    const newUser = await User.create({name, email, password, passwordConfirm})
    const token = createToken({name, email, useId: newUser._id, photo: newUser.photo});
    res.status(201).json({status: 'sussecc', token, message: 'create new user', data: {user: newUser}})

  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allError: err})
  }
}

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
    const token = createToken({name: findUser.name, email: findUser.email, useId: findUser._id, photo: findUser.photo});
    res.status(200).json({status: 'success', token, data: {user: findUser}})

  } catch(err) {
    res.status(400).json({status: 'fall', message: err.message, allError: err})
  }
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
    const token = createToken({name: userFromToken.name, email: userFromToken.email, useId: userFromToken._id, photo: userFromToken.photo});
    res.status(200).json({status: 'success', token, data: {user: userFromToken}})
  } catch(err) {
    res.status(500).json({status: 'fall', errorMessage: err.message , allMessage: err})
    
  }
}