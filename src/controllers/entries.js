import Entry from "../models/Entry.js";
import Card from "../models/Card.js";
import User from "../models/User.js";
import { Sequelize } from "sequelize";
import Access from "../models/Access.js";
import Class from "../models/Class.js";
import { v4 as uuidv4 } from "uuid";

/**
 * @description User entry
 */

class EntryController {
  /**
   * @description Register class
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with created class
   */

  static async createClass(req, res) {
    try {
      const { studentId, ClassIdentifier } = req.body;
      // const classExist = await Class.findOne({ where: { ClassIdentifier } });
      // if (classExist) {
      //   return res.status(403).json({
      //     status: 403,
      //     error: `This class ${ClassIdentifier} arleady exist`,
      //   });
      // }
      const newClass = await Class.create({
        id: uuidv4(),
        studentId,
        ClassIdentifier,
      });
      return res.status(201).json({
        status: 201,
        message: "A new class have been added",
        data: newClass,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description get all classes information
   * @param {object} req
   * @param {object} res
   * @return {object} return object with all classes information
   */

  static async allClasses(req, res) {
    try {
      const classes = await Class.findAll();
      if (!classes) {
        return res.status(404).json({
          status: 404,
          error: "No classes found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "All classes retrieved successfully",
        classes,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description Register entry
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with created entry
   */
  static async createEnties(req, res) {
    try {
      const { cardId } = req.query;
      Card.findOne({
        where: {
          cardId,
        },
      }).then((readCard) => {
        if (readCard) {
          User.findOne({
            where: {
              cardId,
            },
        
          }).then((readUser) => {
            if (readUser) {
              const selectedUser = {
                cardId: readUser.cardId,
                studentId: readUser.studentId,
               
              };

              Entry.create(selectedUser);
              return res.status(200).json({
                status: 200,
                message: "You successfully attended",
                data: selectedUser,
              });
            } else {
              res.json({ error: "Access denied" });
            }
          });
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description Register access
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with created access
   */

  static async registerAccess(req, res) {
    try {
      const info = {
        owner_to_view: req.body.owner_to_view,
        allowed_view: req.body.allowed_view,
      };

      await Access.create(info).then((access) => {
        res.status(200).json({
          message: access.id + " registered",
        });
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description get all access information
   * @param {object} req
   * @param {object} res
   * @return {object} return object with all access information
   */

  static async accessInfo(req, res) {
    try {
      const view = req.params.view;

      await Access.findAll({
        where: {
          owner_to_view: view,
        },
      }).then((read) => {
        if (read) {
          const data = read.map((item) => {
            return item.get("allowed_view");
          });
          res.status(200).json({
            message: "Access info retrieved successfully",
            data,
          });
        } else {
          res.status(404).json("No data found");
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description get all entries
   * @param {object} req
   * @param {object} res
   * @return {object} return object with all entries
   */
  static async allEntries(req, res) {
    try {
      const ClassIdentifier = req.params.ClassIdentifier;
      await Class.findAll({
        where: {
          ClassIdentifier,
        },
      }).then((read) => {
        if (read) {
          const data = read.map((item) => {
            return item.get("studentId");
          });
          console.log(data);
          Entry.findAll({
            where: {
              studentId: data,
            },  
          }).then((read) => {
            if (read) {
              const data = read.map((item) => {
                return {
                  id: item.id,
                  cardId: item.cardId,
                  studentId: item.studentId,
                  createdAt: item.createdAt,
                };
              });
              console.log(data);
              if (!data) {
                return res.status(404).json({
                  status: 404,
                  error: "Data not found",
                });
              }

              return res.status(200).json({
                status: 200,
                message: "successfull retrieve all entries",
                data: data, 
              });
            }
          });

      
        }
      });
    } catch (err) {
      throw err;
    }
  }
}

export default EntryController;
