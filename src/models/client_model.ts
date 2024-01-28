import { DataTypes } from "sequelize";

import sequelize from "./sequelize";
import bookModel from "./book_model";
import orderModel from "./order_model";

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

clientModel.belongsToMany(bookModel , {through: orderModel});
bookModel.belongsToMany(clientModel , {through: orderModel});


export default clientModel;