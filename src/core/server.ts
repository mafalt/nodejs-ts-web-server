import { AppConfig, ServerConfig, DatabaseConfig } from "./config";
import { IController, IDataClient } from "./interfaces";
import { RequestListener, Server as HttpServer, createServer as createHttpServer, IncomingMessage, ServerResponse } from "http";
import { Server as HttpsServer, createServer as createHttpsServer } from "https";
import { Server as NetServer } from "net";
import express, { RequestHandler } from "express";
import fs from "fs";
import { hostname } from "os";
import path from "path";

type ServerParams = {
    config: AppConfig,
    dataClient: IDataClient
};

/**
 * __Server__ class encapsulates whole web server functionality.
 */
export class Server {
    private _httpServer: HttpServer;
    private _httpsServer: HttpsServer;
    private _app: express.Application;

    /**
     * Creates and initializes new instance.
     * @param _params Server setup parameters
     */
    constructor(
        private _params: ServerParams
    ) {
        this._app = express();
        this.init();
    }

    private get serverConfig(): ServerConfig {
        return this._params.config.server;
    }

    private get dbConfig(): DatabaseConfig {
        return this._params.config.db;
    }

    private get httpPort(): number | string {
        return this.serverConfig.httpPort;
    }

    private get httpsPort(): number | string {
        return this.serverConfig.httpsPort;
    }

    private get key(): Buffer | string {
        return fs.readFileSync(this.serverConfig.keyFilePath);
    }

    private get cert(): Buffer | string {
        return fs.readFileSync(this.serverConfig.certFilePath);
    }

    private get useSSL(): boolean {
        return this.serverConfig.useSSL;
    }

    private get enableHttpRedirect(): boolean {
        return this.serverConfig.enableHttpRedirect;
    }

    private get viewEngine(): string {
        return this.serverConfig.viewEngine;
    }

    private get viewsFolder(): string {
        return this.serverConfig.viewsFolder;
    }

    private get publicFolder(): string {
        return this.serverConfig.publicFolder;
    }

    private get controllers(): IController[] {
        return this.serverConfig.controllers;
    }

    private get middlewares(): RequestHandler[] {
        return this.serverConfig.middlewares;
    }

    private init() {
        this.initViews();
        this.initStatic();
        this.initMiddlewares();
        this.initControllers();
    }

    private initViews() {
        this._app.set('views', path.join(__dirname, this.viewsFolder));
        this._app.set('view engine', this.viewEngine);
    }

    private initStatic() {
        this._app.use(express.static(path.join(__dirname, this.publicFolder)));
    }

    private initMiddlewares() {
        if (this.middlewares && this.middlewares.length > 0) {
            for (const m of this.middlewares) {
                this._app.use(m);
            }
        }
    }

    private initControllers() {
        if (this.controllers && this.controllers.length > 0) {
            for (const c of this.controllers) {
                this._app.use(c.baseUrl, c.router);
            }
        }
    }

    private initHttpServer(listener: RequestListener): HttpServer {
        return createHttpServer(listener);
    }

    private initHttpsServer(listener: RequestListener): HttpsServer {
        return createHttpsServer({
            key: this.key,
            cert: this.cert
        }, listener);
    }

    private createServers() {
        if (this.useSSL) {
            this._httpsServer = this.initHttpsServer(this._app);

            if (this.enableHttpRedirect) {
                this._httpServer = this.initHttpServer((req: IncomingMessage, res: ServerResponse) => {
                    const httpsHost = req.headers.host.replace(`${this.httpPort}`, `${this.httpsPort}`);
                    res.writeHead(301, {"Location": `https://${httpsHost}${req.url}`});
                    res.end();
                });
            }
        } else {
            this._httpServer = this.initHttpServer(this._app);
        }
    }

    private startServer(server: NetServer, port: number | string, msg?: string) {
        if (server) {
            server.listen(port, msg ? () => {
                // tslint:disable-next-line:no-console
                console.log(msg);
            } : null);
        }
    }

    /**
     * Starts server listener.
     * If SSL is enabled and HTTP redirection is enabled then HTTP server is started too and it is configured
     * to redirect HTTP requests to HTTPS.
     */
    start() {
        this.createServers();

        if (!this.useSSL || (this.useSSL && this.enableHttpRedirect)) {
            this.startServer(this._httpServer, this.httpPort, `HTTP listener started on ${hostname}:${this.httpPort}`);
        }

        if (this.useSSL && this._httpsServer) {
            this.startServer(this._httpsServer, this.httpsPort, `HTTPS listener started on ${hostname}:${this.httpsPort}`);
        }
    }
}
