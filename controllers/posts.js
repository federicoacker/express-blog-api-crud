import { posts, validatePost, filterPosts, createPostSlug, getCreationTime } from "../data/posts.js";

const postsController = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}

function index(request, response) {
    const filteredPosts = filterPosts(request.query);

    if(filteredPosts.length === 0){
        return response.status(404).json({
            error: "Non abbiamo post che rispettino le tue query",
            result: []
        });
    }
    response.json(
        {
            error: null,
            result: filteredPosts
        }
    )

}

function show(request, response) {
    const id = request.params.id;
    const convertedId = parseInt(id);

    if (isNaN(convertedId) || convertedId < 0) {
        return response.status(400).json({
            error: "L'id inserito non è in un formato valido",
            result: []
        });
    }

    const foundPost = posts.find(post => post.id === convertedId);

    if (!foundPost) {
        return response.status(404).json({
            error: "Non abbiamo trovato nessun post con quell'id",
            result: []
        })
    }

    response.json({
        error: null,
        result: foundPost
    })

}

function store(request, response) {
    const postReceived = request.body;
    const validatedPost = validatePost(postReceived);

    if (!validatedPost) {
        return response.status(400).json({
            error: "Oggetto invalido passato al server",
            result: []
        })
    }

    const newPost = ({
        ...validatedPost,
        id: posts.length + 1,
        created_at: getCreationTime()
    });

    newPost.slug = createPostSlug(newPost);

    posts.push(newPost);

    response.status(201).json({
        error: null,
        result: newPost
    })
}

function update(request, response) {
    const updateReceived = request.body;
    response.json({
        error:null,
        result: "Bravo hai fatto una put"
    })
}

function modify(request, response) {
    response.json({
        error:null,
        result: "Bravo hai fatto una patch"
    })
}

function destroy(request, response) {

    const idReal = Number(request.params.id);

    if(isNaN(idReal) || idReal <= 0){
        return response.status(400).json({
            error:"L'id inserito non è nel formato corretto. Deve essere un numero intero positivo",
            result: null
        });
    }

    const postIndex = posts.findIndex(post => post.id === idReal);

    if(postIndex === -1){
        return response.status(404).json({
            error: "Non ci sono post con quell'id",
            result: null
        })
    }

    posts.splice(postIndex, 1);
    response.sendStatus(204);
}

export default postsController;
