import DataTypes from "sequelize";
import sequel from "../database/database.js";
import User from "../models/User.js";

const Access = sequel.sequelize.define(
  "access",
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement:true,
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

// Access.belongsTo(User, {
//   foreignKey: {
//     name: "owner_to_view",
//     allowNull: true,
//   },
// });

// Access.belongsTo(User, {
//   foreignKey: {
//     name: "allowed_view",
//     allowNull: true,
//   },
// });{ force: true }
Access.sync();
console.log("The table for the Access model was just (re)created!");

export default Access;
