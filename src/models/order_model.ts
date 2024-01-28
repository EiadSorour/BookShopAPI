import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const orderModel = sequelize.define("order" , {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default orderModel;