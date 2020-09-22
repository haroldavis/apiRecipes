import { createConnection } from 'typeorm'
import {User} from './entity/user'
import {Recipe} from './entity/recipe'
import {Category} from './entity/category'

export async function connect() {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "test",
        entities: [
            User,
            Recipe,
            Category
        ],
        synchronize: true,
    });
    console.log('DB is corrected')
    console.log(__dirname)
}