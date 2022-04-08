import Card from "../models/Card";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";

config();

/**
 * @description holds card logic
 */

class Cards {
  /**
   * @description Register card
   * @param {object} req
   * @param {object} res
   * @returns {object} returns object with created card
   */

  static async createCard(req, res) {
    try {
      const { cardId } = req.body;
      const cardExist = await Card.findOne({ where: { cardId } });

      if (cardExist) {
        return res.status(403).json({
          status: 403,
          error: `This card ${cardId} arleady exist`,
        });
      }
      const newCard = await Card.create({
        id: uuidv4(),
        cardId,
      });
      return res.status(201).json({
        status: 201,
        message: "A new card have been added",
        data: newCard,
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @description get all cards
   * @param {object} req
   * @param {object} res
   * @return {object} return object with all cards
   */

  static async allCards(req, res) {
    try {
      const cards = await Card.findAll();
      if (!cards) {
        return res.status(404).json({
          status: 404,
          error: "No cars found",
        });
      }
      return res.status(200).json({
        status: 200,
        message: "All cards retrieved successfully",
        cards,
      });
    } catch (err) {
      throw err;
    }
  }
}

export default Cards;
