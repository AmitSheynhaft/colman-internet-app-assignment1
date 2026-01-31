import { Router } from "express";
import exampleRoutes from "./example.routes";
import postRoutes from "./post.routes";
import commentsRoutes from "./comment.routes";

const router = Router();

// Register route modules
router.use("/example", exampleRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentsRoutes);

export default router;
