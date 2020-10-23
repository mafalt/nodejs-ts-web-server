import { Handler, Request, Response, NextFunction } from "express";
import { IDataClient } from "./interfaces";

/**
 * Adds database client instance into response that it is available to all router handlers.
 * @param dataClient Instance of _IDataClient_ interface
 */
function addDatabaseClientToResponse(dataClient: IDataClient): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        res.locals.dataClient = dataClient;
        next();
    };
}

export { addDatabaseClientToResponse };
