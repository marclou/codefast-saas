// a model for a Post document in the database. Each post has a title, description, a boardId to which it belongs, and a userId (optional) of the user who created it (if logged in). The boardId and userId fields are references to the Board and User models, respectively.

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 1000,
		},
		boardId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Board",
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		votesCounter: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
