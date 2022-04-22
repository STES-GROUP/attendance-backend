import DataTypes from "sequelize";
import sequel from "../database/database";
import User from "./User";

const Class = sequel.sequelize.define(
  "class",
  {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ClassIdentifier: {
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

Class.belongsTo(User, { foreignKey: "studentId", onDelete: "CASCADE" });

Class.sync();
console.log("The table for the Class model was just (re)created!");

export default Class;
