import { validatePatch } from "../data/posts.js";

function validateU(request, response, next) {
    const modifications = request.body;
    const validatedModifications = validatePatch(modifications);

    if (!validatedModifications) {
        return response.status(400).json({
            error: "Oggetto invalido passato al server",
            result: []
        })
    }

    request.validatedModifications = validatedModifications;

    next();
}

export default validateU;