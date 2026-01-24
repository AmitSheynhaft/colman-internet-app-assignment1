import { Router } from "express";
import { createComment, getAllComments, getCommentById, getCommentsByPostId } from "../controllers/comment.controller";

const router = Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.get("/post/:postId", getCommentsByPostId);

export default router;
