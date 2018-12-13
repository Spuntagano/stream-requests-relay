module.exports = class AuthorizationError {
    public e: Error;
    public message: string;
    public status: number;
    public log: boolean;

    constructor(e, message = 'Invalid token', status = 403, log = false) {
        this.e = e;
        this.message = message;
        this.status = status;
        this.log = log;
    }
};
