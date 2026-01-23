import { Router } from "express";
import { createPost } from "../controllers/post.controller";

const router = Router();

// POST /api/posts - Create a new post
router.post("/", createPost);

export default router;
