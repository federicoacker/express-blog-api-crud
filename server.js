import express from "express";
import postsRouter from "./routers/posts.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const SERVER_URL = process.env.SERVER_URL;
const SERVER_PORT = process.env.SERVER_PORT;

app.use("/posts", postsRouter)
app.use(express.static("public"));


app.use(errorHandler);
app.use(notFound);

app.listen(SERVER_PORT, (error)=>{
    if(error){
        console.error(error);
    }
    else {
        console.log(`Server in ascolto su ${SERVER_URL}:${SERVER_PORT}`);
    }
})