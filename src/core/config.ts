import { RequestHandler } from "express";
import { IController } from "./interfaces";

type ServerConfigParams = {
    httpPort?: number | string,
    httpsPort?: number | string,
    keyFilePath?: string,
    certFilePath?: string,
    useSSL?: boolean,
    enableHttpRedirect?: boolean,
    viewEngine?: string,
    viewsFolder?: string,
    publicFolder?: string,
    controllers?: IController[],
    middlewares?: RequestHandler[]
};

type DbConfigParams = {
    serverName: string,
    port?: number | string,
    dbName?: string,
    user?: string,
    password?: string
};

type AppConfigParams = {
    databaseConfig?: DatabaseConfig,
    serverConfig?: ServerConfig
};

/**
 * Encapsulates server configuration.
 */
class ServerConfig {
    /**
     * Creates and initializes instance of _ServerConfig_ class.
     * @param _params Server configuration parameters
     */
    constructor(
        private _params: ServerConfigParams
    ) {}

    /**
     * Gets HTTP port number.
     */
    get httpPort(): number | string {
        return this._params.httpPort;
    }

    /**
     * Sets value of HTTP port.
     * @param value New HTTP port number
     */
    set httpPort(value: number | string) {
        this._params.httpPort = value;
    }

    /**
     * Sets value of HTTP port.
     * @param value New HTTP port number
     */
    setHttpPort(value: number | string): ServerConfig {
        this.httpPort = value;
        return this;
    }

    /**
     * Gets HTTPS port number.
     */
    get httpsPort(): number | string {
        return this._params.httpsPort;
    }

    /**
     * Sets value of HTTPS port.
     * @param value New HTTPS port number
     */
    set httpsPort(value: number | string) {
        this._params.httpsPort = value;
    }

    /**
     * Sets value of HTTPS port.
     * @param value New value of HTTPS port
     */
    setHttpsPort(value: number | string): ServerConfig {
        this.httpsPort = value;
        return this;
    }

    /**
     * Gets path to key file.
     */
    get keyFilePath(): string {
        return this._params.keyFilePath;
    }

    /**
     * Sets path to key file.
     */
    set keyFilePath(value: string) {
        this._params.keyFilePath = value;
    }

    /**
     * Sets path to key file.
     * @param value Path to key file
     */
    setKeyFilePath(value: string): ServerConfig {
        this.keyFilePath = value;
        return this;
    }

    /**
     * Gets path to certification file.
     */
    get certFilePath(): string {
        return this._params.certFilePath;
    }

    /**
     * Sets path to certification file.
     */
    set certFilePath(value: string) {
        this._params.certFilePath = value;
    }

    /**
     * Sets path to certification file.
     * @param value New path to certification file
     */
    setCertFilePath(value: string): ServerConfig {
        this.certFilePath = value;
        return this;
    }

    /**
     * Gets whether to use SSL connection.
     */
    get useSSL(): boolean {
        return this._params.useSSL;
    }

    /**
     * Sets whether to use SSL connection.
     */
    set useSSL(value: boolean) {
        this._params.useSSL = value;
    }

    /**
     * Sets whether to use SSL connection.
     * @param value Flag specifying whether SSL connection should be used
     */
    setUseSSL(value: boolean): ServerConfig {
        this.useSSL = value;
        return this;
    }

    /**
     * Gets whether HTTP should be redirected.
     */
    get enableHttpRedirect(): boolean {
        return this._params.enableHttpRedirect;
    }

    /**
     * Sets whether HTTP should be redirected.
     */
    set enableHttpRedirect(value: boolean) {
        this._params.enableHttpRedirect = value;
    }

    /**
     * Sets whether HTTP should be redirected.
     * @param value Flag specifying whether HTTP request should be redirected
     */
    setEnableHttpRedirect(value: boolean): ServerConfig {
        this.enableHttpRedirect = value;
        return this;
    }

    /**
     * Gets view engine.
     */
    get viewEngine(): string {
        if (!this._params.viewEngine) {
            this.viewEngine = 'ejs';
        }

        return this._params.viewEngine;
    }

    /**
     * Sets view engine.
     */
    set viewEngine(value: string) {
        this._params.viewEngine = value;
    }

    /**
     * Sets view engine.
     * @param value Name of view engine
     */
    setViewEngine(value: string): ServerConfig {
        this.viewEngine = value;
        return this;
    }

    /**
     * Gets views folder.
     */
    get viewsFolder(): string {
        if (!this._params.viewsFolder) {
            this.viewsFolder = 'views';
        }

        return this._params.viewsFolder;
    }

    /**
     * Sets views folder.
     */
    set viewsFolder(value: string) {
        this._params.viewsFolder = value;
    }

    /**
     * Sets views folder.
     * @param value Path to views folder
     */
    setViewsFolder(value: string): ServerConfig {
        this.viewsFolder = value;
        return this;
    }

    /**
     * Gets public folder.
     */
    get publicFolder(): string {
        if (!this._params.publicFolder) {
            this.publicFolder = 'public';
        }

        return this._params.publicFolder;
    }

    /**
     * Sets public folder.
     */
    set publicFolder(value: string) {
        this._params.publicFolder = value;
    }

    /**
     * Sets public folder.
     * @param value Path to public folder
     */
    setPublicFolder(value: string): ServerConfig {
        this.publicFolder = value;
        return this;
    }

    /**
     * Gets array of controllers.
     */
    get controllers(): IController[] {
        return this._params.controllers;
    }

    /**
     * Sets array of controllers.
     */
    set controllers(value: IController[]) {
        this._params.controllers = value;
    }

    /**
     * Sets array of controllers.
     * @param controllers Array of controllers
     */
    setControllers(controllers: IController[]): ServerConfig {
        this.controllers = controllers;
        return this;
    }

    /**
     * Adds controller.
     * @param controller Controller to be added
     */
    addController(controller: IController): ServerConfig {
        this.controllers.push(controller);
        return this;
    }

    /**
     * Gets array of middlewares.
     */
    get middlewares(): RequestHandler[] {
        return this._params.middlewares;
    }

    /**
     * Sets array of middlewares.
     */
    set middlewares(value: RequestHandler[]) {
        this._params.middlewares = value;
    }

    /**
     * Sets array of middlewares.
     * @param middlewares Array of middlewares
     */
    setMiddlewares(middlewares: RequestHandler[]): ServerConfig {
        this.middlewares = middlewares;
        return this;
    }

    /**
     * Adds middleware.
     * @param middleware Middleware to be added
     */
    addMiddleware(middleware: RequestHandler): ServerConfig {
        this.middlewares.push(middleware);
        return this;
    }
}

/**
 * __DatabaseConfig__ class encapsulates whole database configuration.
 */
class DatabaseConfig {
    /**
     * Creates and initializes new instance.
     * @param _params Database configuration parameters
     */
    constructor(
        private _params: DbConfigParams
    ) {}

    /**
     * Gets server name.
     */
    get serverName(): string {
        return this._params.serverName;
    }

    /**
     * Sets server name.
     */
    set serverName(value: string) {
        this._params.serverName = value;
    }

    /**
     * Sets server name.
     * @param value Name of the server
     */
    setServerName(value: string): DatabaseConfig {
        this.serverName = value;
        return this;
    }

    /**
     * Gets server port.
     */
    get port(): number | string {
        return this._params.port;
    }

    /**
     * Sets server port.
     */
    set port(value: number | string) {
        this._params.port = value;
    }

    /**
     * Sets server port.
     * @param value Server port value
     */
    setPort(value: number | string): DatabaseConfig {
        this.port = value;
        return this;
    }

    /**
     * Gets name of the database.
     */
    get dbName(): string {
        return this._params.dbName;
    }

    /**
     * Sets name of the database.
     */
    set dbName(value: string) {
        this._params.dbName = value;
    }

    /**
     * Sets name of the database.
     * @param value Name of the database
     */
    setDbName(value: string): DatabaseConfig {
        this.dbName = value;
        return this;
    }

    /**
     * Gets name of the database user.
     */
    get user(): string {
        return this._params.user;
    }

    /**
     * Sets name of the database user.
     */
    set user(value: string) {
        this._params.user = value;
    }

    /**
     * Sets name of the database user.
     * @param value Name of database user
     */
    setUser(value: string): DatabaseConfig {
        this.user = value;
        return this;
    }

    /**
     * Gets database user's password.
     */
    get password(): string {
        return this._params.password;
    }

    /**
     * Sets database user's password.
     */
    set password(value: string) {
        this._params.password = value;
    }

    /**
     * Sets database user's password.
     * @param value Database user's password
     */
    setPassword(value: string): DatabaseConfig {
        this.password = value;
        return this;
    }
}

/**
 * Encapsulates application configuration.
 */
class AppConfig {
    /**
     * Creates and initializes new instance of application configuration.
     * @param _serverConfig Server configuration
     * @param _dbConfig Database configuration
     */
    constructor(
        private _serverConfig?: ServerConfig,
        private _dbConfig?: DatabaseConfig
    ) {}

    /**
     * Gets server configuration.
     */
    get server(): ServerConfig {
        return this._serverConfig;
    }

    /**
     * Gets database configuration.
     */
    get db(): DatabaseConfig {
        return this._dbConfig;
    }
}

export { AppConfig, DatabaseConfig, ServerConfig };
