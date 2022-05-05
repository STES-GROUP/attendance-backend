import DataTypes from "sequelize";
import sequel from "../database/database.js";
import Class from "./Class.js";
import User from "./User.js";

const Entry = sequel.sequelize.define(
  "entry",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    studentId: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cardId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ClassIdentifier: {
      allowNull: true,
      type: DataTypes.STRING,
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

// Entry.belongsTo(Class, { foreignKey: "id", onDelete: "CASCADE" });
// Entry.belongsTo(User, { foreignKey: "studentId", onDelete: "CASCADE" });
Entry.sync();
console.log("The table for the Entry model was just (re)created!");

export default Entry;
