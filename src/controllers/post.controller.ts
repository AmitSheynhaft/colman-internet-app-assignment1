import { Request, Response } from "express";
import Post from "../models/Post.model";
import { HTTP_STATUS } from "../constants/constants";

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error: any) {
    console.error("Error retrieving posts:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error: any) {
    console.error("Error retrieving post:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, sender } = req.body;

    if (!title || !content || !sender || !sender.id || !sender.name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Missing required fields: title, content, and sender (with id and name) are required",
      });
      return;
    }

    const newPost = new Post({
      title,
      content,
      sender: {
        id: sender.id,
        name: sender.name,
      },
    });

    const savedPost = await newPost.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Post created successfully",
      data: savedPost,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((err: any) => err.message),
      });
      return;
    }

    console.error("Error creating post:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
