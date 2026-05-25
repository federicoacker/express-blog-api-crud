const blogPosts = [
    {
        id: 1,
        title: "Introduzione a Express",
        content: "Scopri come creare un server web con Express, impostare route e gestire richieste HTTP in modo semplice.",
        image: "https://placehold.co/600x400?text=Express"
    },
    {
        id: 2,
        title: "Routing avanzato in Express",
        content: "Impara a usare router modulari, middleware personalizzati e parametri dinamici per organizzare meglio la tua app.",
        image: "https://placehold.co/600x400?text=Routing"
    },
    {
        id: 3,
        title: "Gestione dei dati nel blog",
        content: "Vediamo come salvare, leggere e aggiornare i post del blog con array di oggetti e rotte RESTful.",
        image: "https://placehold.co/600x400?text=Blog+Data"
    },
    {
        id: 4,
        title: "Middleware e validazione",
        content: "Scopri come aggiungere middleware per validare i dati in entrata e gestire gli errori in modo elegante.",
        image: "https://placehold.co/600x400?text=Middleware"
    },
    {
        id: 5,
        title: "Deploy dell'app Express",
        content: "Consigli pratici per distribuire il tuo blog Express su un servizio cloud come Heroku o Vercel.",
        image: "https://placehold.co/600x400?text=Deploy"
    }
]

function validatePost (post){
    if(!post){
        return null;
    }
    if(!post.hasOwnProperty("title") || !post.hasOwnProperty("content") || !post.hasOwnProperty("image")){
        return null;
    } 

    for(const property of Object.entries(post)){
        if(property[0] === "image"){
            if(property[1].trim() === ""){
                continue;
            }
        }
        else if (property[1].trim() === ""){
            return null;
        }
    }

    return post;
}
export {
    blogPosts,
    validatePost
}