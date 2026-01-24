import { Router } from "express";
import { createComment, getAllComments, getCommentById, getCommentsByPostId, updateComment } from "../controllers/comment.controller";

const router = Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.get("/post/:postId", getCommentsByPostId);
router.put("/:id", updateComment);


export default router;
