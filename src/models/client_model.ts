import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const clientModel = sequelize.define("client" , {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    money_owned:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_books_bought:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

export default clientModel;