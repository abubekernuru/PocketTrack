
const validateBody = (req, res, next) => {
    // Only validate requests that have a parsed JSON body
    if (
        req.is("application/json") &&
        (
            req.body === null ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Request body must be a valid JSON object",
            statusCode: 400,
        });
    }

    next();
};

module.exports = validateBody;
