"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ButtonVote = ({ postId, initialVotesCounter }) => {
	const localStorageKeyName = `codefastSaaS-hasVoted-${postId}`;

	const [hasVoted, setHasVoted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [votesCounter, setVotesCounter] = useState(initialVotesCounter);

	useEffect(() => {
		setHasVoted(localStorage.getItem(localStorageKeyName) === "true");
	}, []);

	const handleVote = async () => {
		if (isLoading) return;

		setIsLoading(true);

		try {
			if (hasVoted) {
				setHasVoted(false);
				setVotesCounter(votesCounter - 1);

				await axios.delete(`/api/vote?postId=${postId}`);
				localStorage.removeItem(localStorageKeyName);
			} else {
				setHasVoted(true);
				setVotesCounter(votesCounter + 1);

				await axios.post(`/api/vote?postId=${postId}`);
				localStorage.setItem(localStorageKeyName, "true");
			}
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
		<button
			className={`group border px-4 py-2 rounded-xl text-lg duration-200 ${
				hasVoted
					? "bg-primary text-primary-content border-transparent"
					: "bg-base-100 text-base-content hover:border-base-content/25 "
			}`}
			onClick={handleVote}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-6 group-hover:-translate-y-0.5 duration-200"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m4.5 15.75 7.5-7.5 7.5 7.5"
				/>
			</svg>

			<div>{votesCounter}</div>
		</button>
	);
};

export default ButtonVote;
