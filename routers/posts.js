import { Router } from "express";
import express from "express";
import postsController from "../controllers/posts.js";
import validateCP from "../middlewares/validateCP.js";
import validateU from "../middlewares/validateU.js";

const postsRouter = express.Router();
postsRouter.use(express.json());


postsRouter.get("/", postsController.index);

postsRouter.get("/:slug", postsController.show);

postsRouter.post("/", [validateCP, postsController.store]);

postsRouter.put("/:slug", [validateCP, postsController.update]);

postsRouter.patch("/:slug", [validateU, postsController.modify]);

postsRouter.delete("/:slug", postsController.destroy);

export default postsRouter;