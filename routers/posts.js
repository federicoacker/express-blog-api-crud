import { Router } from "express";
import express from "express";
import postsController from "../controllers/posts.js";
import validateCP from "../middlewares/validateCP.js";
import validateU from "../middlewares/validateU.js";
import fetchPost from "../middlewares/fetchPost.js";

const postsRouter = express.Router();
postsRouter.use(express.json());


postsRouter.get("/", postsController.index);

postsRouter.get("/:slug", [fetchPost, postsController.show]);

postsRouter.post("/", [validateCP, postsController.store]);

postsRouter.put("/:slug", [validateCP, fetchPost, postsController.update]);

postsRouter.patch("/:slug", [validateU, fetchPost,  postsController.modify]);

postsRouter.delete("/:slug", [fetchPost ,postsController.destroy]);

export default postsRouter;