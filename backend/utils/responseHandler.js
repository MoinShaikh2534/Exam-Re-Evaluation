class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ApiResponse {
    constructor(statusCode, message, data = null) {
        this.statusCode = statusCode;
        this.success = true;
        this.message = message;
        this.data = data;
    }
}
const createError = (statusCode, message) => {
    return new ApiError(statusCode, message);
};

const createResponse = (statusCode, message, data) => {
    return new ApiResponse(statusCode, message, data);
};

module.exports = {
    createError,
    createResponse,
};
