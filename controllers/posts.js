import { posts, validatePost } from "../data/posts.js";

const postsController = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}

function index(request, response) {

    response.json(
        {
            error: null,
            result: [posts]
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
    const objectReceived = request.body;
    const validatedObject = validatePost(objectReceived);
    if (!validatedObject) {
        return response.status(400).json({
            error: "Oggetto invalido passato al server",
            result: []
        })
    }
    posts.push({
        ...validatedObject,
        id: posts.length + 1
    });
    response.status(201).json({
        error: null,
        result: posts
    })
}

function update(request, response) {
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
    response.json({
        error:null,
        result: "Bravo hai fatto una delete"
    })

}

export default postsController;
