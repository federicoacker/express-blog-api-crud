import { validatePostAndPut } from "../data/posts.js";

function validateCP(request, response, next) {
    const newPostToCreate = request.body;
    const validatedPost = validatePostAndPut(newPostToCreate);

    if (!validatedPost) {
        return response.status(400).json({
            error: "Oggetto invalido passato al server",
            result: []
        })
    }

    request.validatedPost = validatedPost;

    next();
}

export default validateCP;