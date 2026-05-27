import { posts } from "../data/posts.js";

function fetchPost(request, response, next){
    const slug = request.params.slug;
    const foundPostIndex = posts.findIndex(post => post.slug === slug);

    if(foundPostIndex === -1){
        return response.status(404).json({
            error: "Non abbiamo trovato nessun post con quell'id",
            result: null
        })
    }

    request.foundPostIndex = foundPostIndex;
    request.foundPost = posts[foundPostIndex];

    next();
}

export default fetchPost;