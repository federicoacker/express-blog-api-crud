
function notFound (request, response, next){
    response.status(404).json({
        error:"Pagina non trovata",
        result: null
    });
}

export default notFound;