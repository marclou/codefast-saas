"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormAddPost = ({ boardId }) => {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (isLoading) return;

		setIsLoading(true);

		try {
			await axios.post(`/api/post?boardId=${boardId}`, {
				title,
				description,
			});

			setTitle("");
			setDescription("");

			toast.success("Post added!");

			router.refresh();
		} catch (error) {
			const errorMessage =
				error.response?.data?.error ||
				error.message ||
				"Something went wrong";

			toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			className="bg-base-100 p-8 rounded-3xl space-y-8 w-full md:w-96 shrink-0 md:sticky top-8"
			onSubmit={handleSubmit}
		>
			<p className="font-bold text-lg">Suggest a feature</p>

			<label className="form-control w-full">
				<div className="label">
					<span className="label-text">Short, descriptive title</span>
				</div>
				<input
					required
					type="text"
					placeholder="Green buttons plz"
					className="input input-bordered w-full"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
					maxLength={100}
				/>
			</label>

			<label className="form-control">
				<div className="label">
					<span className="label-text">Description</span>
				</div>
				<textarea
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					className="textarea textarea-bordered h-24"
					placeholder="The login button color should be green to match our brand colors."
					maxLength={1000}
				></textarea>
			</label>

			<button className="btn btn-primary w-full" type="submit">
				{isLoading && (
					<span className="loading loading-spinner loading-xs"></span>
				)}
				Add Post
			</button>
		</form>
	);
};

export default FormAddPost;
