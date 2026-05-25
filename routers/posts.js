import { Router } from "express";
import express from "express";
import postsController from "../controllers/posts.js";

const postsRouter = express.Router();
postsRouter.use(express.json());


postsRouter.get("/", postsController.index);

postsRouter.get("/:id", postsController.show);

postsRouter.post("/", postsController.store);

postsRouter.put("/:id", postsController.update);

postsRouter.patch("/:id", postsController.modify);

postsRouter.delete("/:id", postsController.destroy);

export default postsRouter;