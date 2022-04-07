import { config } from "dotenv";
import bcrypt from "bcrypt";

import generator from "generate-password";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import { encode } from "../helpers/auth";
config();

/**
 * @description Authenticates user
 */

class Authentication {
  /**
   * @description user signup
   * @param {object} req
   * @param {object} res
   * @returns {object} signed up user
   */

  static async signup(req, res) {
    try {
      const {
        cardId,
        studentId,
        firststudentId,
        laststudentId,
        phone_number,
        department,
        email,
        role,
      } = req.body;

      const userFound = await User.findOne({ where: { email } });
      if (userFound) {
        return res.status(409).json({
          error: `Email ${email} already exists`,
        });
      }
      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      console.log(password);
      const hash = await bcrypt.hash(password, 10);
      const userData = await User.create({
        id: uuidv4(),
        cardId,
        studentId,
        firststudentId,
        laststudentId,
        phone_number,
        department,
        email,
        password: hash,
        role,
      });

      return res.status(201).json({
        status: 201,
        message: "A new user have been registered",
        data: {
          userData,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description user login
   * @param {object} req
   * @param {object} res
   * @returns {object} logged in user
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const registered = await User.findOne({ where: { email } });

      if (!registered) {
        return res.status(401).json({
          status: 401,
          error: `incorrect ${email} or password provided`,
        });
      }
      const truePassword = bcrypt.compareSync(password, registered.password);

      if (!truePassword) {
        return res.status(401).json({
          status: 401,
          error: "incorrect email or password provided",
        });
      }
      const token = encode({
        email,
      });
      return res.status(200).json({
        status: 200,
        message: " You have been logged in successfully",
        token,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description admins delete a user
   * @param {object} req
   * @param {object} res
   * @returns {object} success message
   */
  static async deleteUser(req, res) {
    try {
      const studentId = req.params.userstudentId;
      const userRole = req.userData.role;
      const user = await User.findOne({ where: { studentId: studentId } });
      if (!user) {
        return res.status(404).json({
          error: `User with student Id ${studentId} not found`,
        });
      }
      if (
        userRole === "user" ||
        user.role === "super-admin" ||
        (userRole === "admin" && user.role === "admin")
      ) {
        return res.status(403).json({
          error: "You do not have permission to perform this action",
        });
      }

      await User.destroy({
        where: {
          studentId: studentId,
        },
      });
      return res.status(200).json({
        message: `User ${studentId} successfully deleted`,
      });
    } catch (err) {
      throw err;
    }
  }
}

export default Authentication;