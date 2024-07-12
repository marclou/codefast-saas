"use client";

import toast from "react-hot-toast";

const CardBoardLink = ({ boardId }) => {
	const boardLink = `${
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://codefastsaas.com"
	}/b/${boardId}`;

	const copyLink = () => {
		navigator.clipboard.writeText(boardLink);
		toast.success("Copied to clipboard!");
	};

	return (
		<div className="bg-base-100 rounded-2xl text-sm px-4 py-2.5 flex items-center max-w-96">
			<p className="truncate">{boardLink}</p>

			<button
				className="btn btn-sm btn-neutral btn-square"
				onClick={copyLink}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
					/>
				</svg>
			</button>
		</div>
	);
};

export default CardBoardLink;
