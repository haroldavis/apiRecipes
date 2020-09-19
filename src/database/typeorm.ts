import { createConnection } from 'typeorm'
import {Product} from '../entity/Product'

export async function connect() {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "test",
        entities: [
            Product
        ],
        synchronize: true,
    });
    console.log('DB is corrected')
    console.log(__dirname)
}