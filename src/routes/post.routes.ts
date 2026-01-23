import { Router } from "express";
import { getAllPosts, getPostById, createPost } from "../controllers/post.controller";

const router = Router();

// GET /api/posts - Get all posts
router.get("/", getAllPosts);

// GET /api/posts/:id - Get a post by ID
router.get("/:id", getPostById);

// POST /api/posts - Create a new post
router.post("/", createPost);

export default router;
