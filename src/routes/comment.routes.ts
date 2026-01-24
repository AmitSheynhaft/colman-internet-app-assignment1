import { Router } from "express";
import { createComment, getAllComments } from "../controllers/comment.controller";

const router = Router();

router.post("/", createComment);
router.get("/", getAllComments);

export default router;
