class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ApiResponse {
    constructor(message, data = null) {
        this.status = true;
        this.message = message;
        this.data = data;
    }
}
const createError = (statusCode, message) => {
    return new ApiError(statusCode, message);
};

const createResponse = (message, data) => {
    return new ApiResponse(message, data);
};

module.exports = {
    createError,
    createResponse,
};
