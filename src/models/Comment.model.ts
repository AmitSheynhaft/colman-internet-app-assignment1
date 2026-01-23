import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  post: mongoose.Types.ObjectId;
  creator: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, "content is required"],
      minlength: [1, "content must be at least 1 character"],
      maxlength: [500, "content cannot exceed 500 characters"],
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "post id is required"],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
  },
  { timestamps: true });

  const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;