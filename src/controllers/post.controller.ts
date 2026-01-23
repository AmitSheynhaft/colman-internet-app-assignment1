import { Request, Response } from "express";
import Post from "../models/Post.model";

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, sender } = req.body;

    if (!title || !content || !sender) {
      res.status(400).json({
        success: false,
        message: "Missing required fields: title, content, and sender are required",
      });
      return;
    }

    const newPost = new Post({
      title,
      content,
      sender,
    });

    const savedPost = await newPost.save();

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: savedPost,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err: any) => err.message),
      });
      return;
    }

    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
