import {createConnection} from "typeorm";

const connection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [
        __dirname + "/entity/*.js"
    ],
    synchronize: true,
}).then(() => {
    console.log('Successfully connected to database', 'DATABASE');
}).catch(error => console.log(error));

export default connection;