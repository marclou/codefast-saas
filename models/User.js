import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
	},
	image: {
		type: String,
	},

	hasAccess: {
		type: Boolean,
		default: false,
	},

	customerId: {
		type: String,
	},

	boards: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Board",
		},
	],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
