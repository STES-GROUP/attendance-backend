import DataTypes from "sequelize";
import sequel from "../database/database";

const Card = sequel.sequelize.define(
  "card",
  {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    cardId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

Card.sync();
console.log("The table for the Card model was just (re)created!");

export default Card;
