import db_client from "../db/db_client";
import Client from "../interfaces/client_interface";

class ClientQueries{
    
    constructor(){}

    public async getClient(clientID:number): Promise<Client>{
        const client:Client = (await db_client.query(`SELECT * FROM client WHERE id = ${clientID};`)).rows[0];
        return client;
    }

    public async getAllClients(): Promise<Client[]>{
        const clients:Client[] = (await db_client.query("SELECT * FROM client;")).rows;
        return clients;
    }

    public async addClient(client:Client): Promise<void>{
        await db_client.query(`INSERT INTO client (first_name,last_name,money_owned) VALUES ('${client.first_name}','${client.last_name}',${client.money_owned});`);
    }

    public async updateClient(client:Client): Promise<Client>{
        await db_client.query(`UPDATE client SET first_name = '${client.first_name}', last_name='${client.last_name}', money_owned=${client.money_owned}, total_books_bought=${client.total_books_bought} WHERE id = ${client.id};`);
        const updatedClient:Client = await this.getClient(client.id as number);
        return updatedClient;
    }

    public async deleteClient(clientID:number): Promise<void>{
        await db_client.query(`DELETE FROM client WHERE id = ${clientID};`);
    }
}

export default new ClientQueries();