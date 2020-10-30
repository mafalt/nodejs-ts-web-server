import { IController } from "./interfaces";
import { Router } from "express";

export abstract class Controller implements IController {
    constructor(
        private _baseUrl: string,
        private _router: Router
    ) {}

    get baseUrl(): string {
        return this._baseUrl;
    }

    get router(): Router {
        return this._router;
    }
}
