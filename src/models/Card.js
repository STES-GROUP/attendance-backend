import DataTypes from "sequelize";
import sequel from "../database/database.js";
// import Entry from "./Entry";

const Card = sequel.sequelize.define(
  "card",
  {
    id: {
      allowNull: false,
      
      type: DataTypes.INTEGER,
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

// Card.belongsTo(Entry, { foreignKey: "cardId", onDelete: "CASCADE" });{force:true}

Card.sync();
console.log("The table for the Card model was just (re)created!");

export default Card;
