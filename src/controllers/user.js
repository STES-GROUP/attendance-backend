import { config } from "dotenv";
import bcrypt from "bcrypt";

// import generator from "generate-password";

import User from "../models/User.js";
import { encode } from "../helpers/auth.js";
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
        id,
        cardId,
        studentId,
        firstName,
        lastName,
        phone_number,
        department,
        email,
        password,
        role,
        postName,
        gender,
        birthDate,
        birthPlace,
        mother,
        father,
        faculty,
        option,
        promotion,
    codePromotion
        
      } = req.body;

      const userFound = await User.findOne({ where: { email } });
      if (userFound) {
        return res.status(409).json({
          error: `Email ${email} already exists`,
        });
      }
      // const password = generator.generate({
      //   length: 10,
      //   numbers: true,
      // });
      // console.log(password);
      const hash = await bcrypt.hash(password, 8);
      const userData = await User.create({
        id,
        cardId,
        studentId,
        firstName,
        lastName,
        phone_number,
        department,
        email,
        password: hash,
        role,
        postName,
        gender,
        birthDate,
        birthPlace,
        mother,
        father,
        faculty,
        option,
        promotion,
        codePromotion
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
   * @description get all Users
   * @param {object} req
   * @param {object} res
   * @return {object} return object with all entries
   */

     static async getAllUsers(req, res) {
      try {
       
        const AllUsers = await User.findAll();
        if(!AllUsers){
          return res.status(404).json({
            status: 404,
            error: "Users not found"
          })
        }
        return res.status(200).json({
          status: 200,
          message: 'all users were retrieved successful',
          data: AllUsers
        });
      } catch (err) {
        throw err;
      }
    }

    
  /**
   * @description admin modify user
   * @param {object} req
   * @param {object} res
   *@returns {object} message
   */

   
  static async update(req, res) {
    try {
      const { body: {  
        cardId,
        studentId,
        firstName,
        lastName,
        phone_number,
        department,
        email,
        password,
        role,
        postName,
        gender,
        birthDate,
        birthPlace,
        mother,
        father,
        faculty,
        option,
        promotion }, query: { id } } = req;
      
      const found = await User.findOne({
        where: {
          id,
        }
      });
      if (found) {
        await User.update({
          cardId,
          studentId,
          firstName,
          lastName,
          phone_number,
          department,
          email,
          password,
          role,
          postName,
          gender,
          birthDate,
          birthPlace,
          mother,
          father,
          faculty,
          option,
          promotion,
          codePromotion
        }, {
          where: {
            id
          },
          returning: true,
          plain: true
        });
        return res.status(200).json({
          status: 200,
          message: 'User was update successfully'
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    } catch (err) {
      throw err;
    }
  }

  
  /**
   * @description admin delete a user
   * @param {object} req
   * @param {object} res
   * @returns {object} success message
   */

  
   static async delete(req, res) {
    try {
      const { query: { id } } = req;
     
      const found = await User.findOne({
        where: {
          id,
        }
      });
      if (found) {
        await User.destroy({
          where: {
            id
          }
        })
        return res.status(200).json({
          status: 200,
          message: 'User have been deleted'
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'User not found '
      });
    } catch (err) {
      throw err;
    }
  }
}

export default Authentication;
