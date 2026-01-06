import { Router } from "express";
import exampleRoutes from "./example.routes";

const router = Router();

// Register route modules
router.use("/example", exampleRoutes);

export default router;
