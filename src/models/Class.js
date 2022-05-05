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

// Class.hasMany(User,{  onUpdate: 'CASCADE', onDelete: "CASCADE" })
// Class.belongsTo(User, { foreignKey: "id", onDelete: "CASCADE" }); {force:true}

 
Class.sync();
console.log("The table for the Class model was just (re)created!");

export default Class;
