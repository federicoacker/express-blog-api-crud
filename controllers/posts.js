import { posts, validatePostAndPut, filterPosts, createPostSlug, getCreationTime, validatePatch } from "../data/posts.js";

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
            result: filteredPosts.map(post => {
                const {id, created_at, ...remaining} = post;
                return remaining;
            })
        }
    )

}

function show(request, response) {
    const foundPost = request.foundPost;

    const {id, created_at, ...remaining} = foundPost;

    response.json({
        error: null,
        result: remaining
    })

}

function store(request, response) {

    const validatedPost = request.validatedPost;
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
    const updateReceived = request.validatedPost; // E' una put, quindi mi aspetto di ricevere TUTTI i dati, per modificare quello che già ho con i dati nuovi.
    const foundPostIndex = request.foundPostIndex;
    
    const newPost = ({
        ...posts[foundPostIndex],
        ...updateReceived,
        created_at: getCreationTime()
    })

    newPost.slug = createPostSlug(newPost);

    posts.splice(foundPostIndex, 1 , newPost);

    const {id, created_at, ...remaining} = newPost;

    response.json({
        error:null,
        result: remaining
    })
}

function modify(request, response) {
    const modifications = request.validatedModifications;
    const foundPostIndex = request.foundPostIndex;
    
    const newPost = ({
        ...posts[foundPostIndex],
        ...modifications,
        created_at: getCreationTime()
    })

    newPost.slug = createPostSlug(newPost);

    posts.splice(foundPostIndex, 1, newPost);

    const {id, created_at, ...remaining} = newPost;

    response.json({
        error:null,
        result: remaining
    })
}

function destroy(request, response) {
    const foundPostIndex = request.foundPostIndex
    posts.splice(foundPostIndex, 1);
    response.sendStatus(204);
}

export default postsController;
