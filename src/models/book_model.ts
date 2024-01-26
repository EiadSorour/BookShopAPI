import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const bookModel = sequelize.define("book" , {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity_in_stock:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default bookModel;