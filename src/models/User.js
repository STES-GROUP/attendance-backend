import DataTypes from "sequelize";
import sequel from "../database/database";

const User = sequel.sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    cardId: {
      type: DataTypes.STRING,
    },
    studentId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    department: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
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

User.sync();
console.log("The table for the User model was just (re)created!");

export default User;
