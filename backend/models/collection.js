import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Collection = sequelize.define("collection", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });


export default Collection;
