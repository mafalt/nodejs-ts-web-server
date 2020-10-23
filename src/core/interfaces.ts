import { Router } from "express";
import { QueryResult, Query } from "./query";

/**
 * Base API for all controllers.
 */
interface IController {
    /**
     * Returns instance of router object.
     */
    readonly router: Router;

    /**
     * Returns controller's base URL.
     */
    readonly baseUrl: string;
}

/**
 * Basic interface for data clients used by application.
 */
interface IDataClient {
    /**
     * Opens connection to database.
     */
    connect(): Promise<any | void>;

    /**
     * Closes connection to database.
     */
    close(): Promise<void>;

    /**
     * Executes query agains underlying database.
     * @param qry Instance of _Query_ class, array of _Query_ objects or string value(s) holding SQL query to be executed
     * @param runInTransaction Specifies whether the query or queries will be executed in transaction
     */
    query(qry: Query | Query[] | string | string[], runInTransaction?: boolean): Promise<QueryResult | void>;
}

export { IController, IDataClient };
