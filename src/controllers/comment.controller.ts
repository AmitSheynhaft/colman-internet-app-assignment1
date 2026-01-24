import mongoose from "mongoose";
import { HTTP_STATUS } from "../constants/constants";
import { Request, Response } from "express";
import Comment from "../models/Comment.model";
import { findPostById } from "./shared/functions";

export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId, content, creatorId } = req.body;

    if (!postId || !content || !creatorId ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Missing required fields: postId, content, creatorId are required",
      });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Invalid postId",
      });
      return;
    }

    // ensure post exists
    const postExists = await findPostById(postId);
    if (!postExists) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const newComment = new Comment({
      postId,
      content,
      creatorId,
    });

    const savedComment = await newComment.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Comment created successfully",
      data: savedComment,
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

    console.error("Error creating comment:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};