import { Server } from "./core/server";
import { AppConfig, DatabaseConfig, ServerConfig } from "./core/config";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { addDatabaseClientToResponse } from "./core/middlewares";
import { IController, IDataClient } from "./core/interfaces";

var dataClient: IDataClient;

const middlewares = [
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({extended: false}),
    cookieParser(),
    addDatabaseClientToResponse(dataClient)
];

const controllers = [] as IController[];

const serverConfig = new ServerConfig({
    httpPort: process.env.HTTP_PORT,
    middlewares: middlewares,
    controllers: controllers
});

const databaseConfig = new DatabaseConfig({
    serverName: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const server = new Server({
    config: new AppConfig(serverConfig, databaseConfig),
    dataClient: null
});

server.start();
