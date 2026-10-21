
const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal server error";

    // Mongoose schema validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Invalid data provided";
    }

    // Invalid MongoDB values
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid value provided";
    }

    // Duplicate values, such as a unique email
    if (err.code === 11000) {
        statusCode = 409;
        message = "A record with this value already exists";
    }

    // Malformed JSON in a request body
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        Object.prototype.hasOwnProperty.call(err, "body")
    ) {
        statusCode = 400;
        message = "Invalid JSON request body";
    }

    // Rejected CORS origin
    if (err.message === "Not allowed by CORS") {
        statusCode = 403;
        message = "This origin is not allowed";
    }

    // Never expose internal server errors in production
    if (
        process.env.NODE_ENV === "production" &&
        statusCode >= 500
    ) {
        message = "Internal server error";
    }

    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};

module.exports = errorMiddleware;
