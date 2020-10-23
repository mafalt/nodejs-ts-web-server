/**
 * QueryParameter class provides abstraction level for passing
 * parameters into database queries.
 * Using _QueryParameter_ class we get enough abstraction to pass parameters to queries
 * of different database engines.
 */
class QueryParameter {
    /**
     * Creates and initializes instance of QueryParameter class.
     *
     * @param _name Name of the parameter
     * @param _value Parameter value
     * @param _type Parameter type
     * @param _isOutput Specifies whether the parameter is output one
     */
    constructor(
        private _name?: string,
        private _value?: any,
        private _type?: any,
        private _isOutput: boolean = false
    ) {}

    /**
     * Gets name of the parameter.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Sets name of the parameter.
     *
     * @param value New parameter's name
     */
    set name(value: string) {
        this._value = value;
    }

    /**
     * Gets value of the parameter.
     */
    get value(): any {
        return this._value;
    }

    /**
     * Sets value of the parameter.
     *
     * @param value New parameter value
     */
    set value(value: any) {
        this._value = value;
    }

    /**
     * Gets parameter type.
     */
    get type(): any {
        return this._type;
    }

    /**
     * Sets type of the parameter.
     *
     * @param value New parameter type
     */
    set type(value: any) {
        this._type = value;
    }

    /**
     * Gets whether the parameter is output one.
     */
    get isOutput(): boolean {
        return this._isOutput;
    }

    /**
     * Sets whether the parameter is output or not.
     *
     * @param value Flag specifying whether the parameter is output or not.
     */
    set isOutput(value: boolean) {
        this._isOutput = value;
    }
}

/**
 * Provides abstraction of query result.
 */
class QueryResult {
    /**
     * Creates a new instance of QueryResult class.
     *
     * @param _rows Array of rows returned by query
     * @param _affectedRows Array of row counts affected by the query
     * @param _error Error raised on query execution
     */
    constructor(
        private _rows: any[],
        private _affectedRows?: number[],
        private _error?: Error
    ) {}

    /**
     * Returns array of rows returned by the query.
     */
    get rows(): any[] {
        return this._rows;
    }

    /**
     * Returns array of affected row counts.
     */
    get affectedRows(): number[] {
        return this._affectedRows;
    }

    /**
     * Returns error occured during query execution.
     */
    get error(): Error {
        return this._error;
    }
}

/**
 * Query class provides abstraction level for executing queries on different database engines.
 */
class Query {
    /**
     * Creates and initializes new instance of _Query_ class.
     * @param _text Query text to be executed.
     * @param _parameters Array of parameters used by the query.
     */
    constructor(
        private _text: string,
        private _parameters?: QueryParameter[]
    ) {}

    /**
     * Gets query text to be executed.
     * @returns Query text.
     */
    get text(): string {
        return this._text;
    }

    /**
     * Sets query text to be executed.
     * @param value Query text.
     */
    set text(value: string) {
        if (value !== this.text) {
            this._text = value;
        }
    }

    /**
     * Gets array of parameters used by the query.
     * @returns Array of _QueryParameter_ instances specifying parameters used by the query.
     */
    get parameters(): QueryParameter[] {
        return this._parameters;
    }

    /**
     * Sets array of parameters used by the query.
     * @param value Array of _QueryParameter_ instances specifying parameters used by the query.
     */
    set parameters(value: QueryParameter[]) {
        if (value !== this.parameters) {
            this._parameters = value;
        }
    }
}

export { QueryParameter, QueryResult, Query };
