import jwt from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";

config();

const encode = (claims) => {
  const token = jwt.sign(claims, process.env.SECRET_KEY, { expiresIn: "7d" });
  return token;
};

const decode = (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  return payload;
};

/**
 * @param {password} password
 * @returns {object} hashed password
 */
const hashedPassword = (password) => bcrypt.hashSync(password, 10);

/**
 *
 * @param {object} hashedPass
 * @param {object} compare
 * @return {object} password
 */

const unhashedPassword = (hashedPass, compare) =>
  bcrypt.compareSync(hashedPass, compare);

export { encode, decode, hashedPassword, unhashedPassword };
