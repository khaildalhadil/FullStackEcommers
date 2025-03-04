import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const pkey = process.env.SECRETKEY;
const expriesDate = process.env.JWT_EXPIRES_IN;

export const createToken = (payload) => {
  return jwt.sign(payload, pkey, {expiresIn: expriesDate});
}

export const checkToekn = (token) => {
  const payload = jwt.verify(token, pkey);
  return payload
}
