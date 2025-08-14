export function errorHandler(err, _req, res, _next) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    if (status >= 500) {
        console.error("SERVER_ERROR:", { message: err.message, stack: err.stack });
    }
    res.status(status).json({ error: message });
}
//# sourceMappingURL=errorHandler.js.map