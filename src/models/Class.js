import DataTypes from "sequelize";
import sequel from "../database/database.js";
import User from "./User.js";
import Entry from "./Entry.js";

const Class = sequel.sequelize.define(
  "class",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement:true,
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

// Class.hasMany(Entry,{ foreignKey: "id",  onDelete: "CASCADE" }){force:true}
Class.belongsTo(User, { foreignKey: "studentId", onDelete: "CASCADE" });
 
Class.sync(); 
console.log("The table for the Class model was just (re)created!");

export default Class;
