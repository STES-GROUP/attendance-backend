import DataTypes from "sequelize";
import sequel from "../database/database.js";
import Class from "./Class.js";
const User = sequel.sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      
      type: DataTypes.INTEGER,
    },
    cardId: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    studentId: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    postName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    birthDate: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    birthPlace: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    mother: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    father: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    faculty: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    option: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    promotion: {
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
    codePromotion: {
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
// User.belongsTo(Class, { foreignKey: "studentId", onDelete: "CASCADE" });
// User.hasMany(Class,{  onUpdate: 'CASCADE' }){force:true}
User.sync();
console.log("The table for the User model was just (re)created!");

export default User;
