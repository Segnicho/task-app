import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Collection from "./collection.js";

const Task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  subtasks: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    defaultValue: [],
  },
  collectionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Collection,
      key: 'id',
    },
  },
});

Task.belongsTo(Collection, { foreignKey: 'collectionId' });
Collection.hasMany(Task, { foreignKey: 'collectionId' });

export default Task;
