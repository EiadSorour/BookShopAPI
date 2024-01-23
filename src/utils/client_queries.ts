import db_client from "../db/db_client";

const getClient = async(clientID:number)=>{
    return await db_client.query(`SELECT * FROM client WHERE id = ${clientID};`);
}

const getAllClients = async ()=>{
    return await db_client.query("SELECT * FROM client;");
}

const insertIntoClient = async (firstName:string, lastName:string, moneyOwned:number)=>{
    return await db_client.query(`INSERT INTO client (first_name,last_name,money_owned) VALUES ('${firstName}','${lastName}',${moneyOwned});`);
}

const updateClient = async (clientID:number ,firstName:string, lastName:string, moneyOwned:number, totalBooksBought:number)=>{
    return await db_client.query(`UPDATE client SET first_name = '${firstName}', last_name='${lastName}', money_owned=${moneyOwned}, total_books_bought=${totalBooksBought} WHERE id = ${clientID};`);
};

const deleteClient = async (clientID:number) => {
    return await db_client.query(`DELETE FROM client WHERE id = ${clientID};`);
}

export default {
    getClient,
    getAllClients,
    insertIntoClient,
    updateClient,
    deleteClient
}