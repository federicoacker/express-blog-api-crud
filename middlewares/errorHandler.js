
function errorHandler ( error, request, response, next) {
    response.status(500).json({
        error,
        result: null
    });
}