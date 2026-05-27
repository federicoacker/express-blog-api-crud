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
    const slug = request.params.slug;


    const foundPost = posts.find(post => post.slug === slug);

    if (!foundPost) {
        return response.status(404).json({
            error: "Non abbiamo trovato nessun post con quello slug",
            result: []
        })
    }

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
    const updateReceived = request.body; // E' una put, quindi mi aspetto di ricevere TUTTI i dati, per modificare quello che già ho con i dati nuovi.
    const validatedUpdate = validatePostAndPut(updateReceived);
    const slug = request.params.slug;
    
    if(!validatedUpdate){
    return response.status(400).json({
            error:"Oggetto invalido passato al server per la PUT, non è che volevi fare la PATCH?",
            result: []
        })
    }

    
    const foundPostIndex = posts.findIndex(post => post.slug === slug);

    if (foundPostIndex === -1) {
        return response.status(404).json({
            error: "Non abbiamo trovato nessun post con quell'id",
            result: []
        })
    }
    
    
    const newPost = ({
        ...posts[foundPostIndex],
        ...validatedUpdate,
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
    const modifications = request.body;
    const validatedModifications = validatePatch(modifications);

    if(!validatedModifications){
        return response.status(400).json({
            error:"Oggetto invalido passato al server",
            result: []
        })
    }

    const slug = request.params.slug;
    
    const foundPostIndex = posts.findIndex(post => post.slug === slug);

    if (foundPostIndex === -1) {
        return response.status(404).json({
            error: "Non abbiamo trovato nessun post con quell'id",
            result: []
        })
    }
    
    
    const newPost = ({
        ...posts[foundPostIndex],
        ...validatedModifications,
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

    const slug = request.params.slug;

    const postIndex = posts.findIndex(post => post.slug === slug);

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
