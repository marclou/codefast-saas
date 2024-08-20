import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

async function getUser() {
	const session = await auth();

	await connectMongo();

	return await User.findById(session.user.id).populate("boards");
}

export default async function Dashboard() {
	const user = await getUser();

	return (
		<main className="bg-base-200 min-h-screen">
			{/* HEADER */}
			<section className="bg-base-100">
				<div className="max-w-5xl mx-auto px-5 py-3 flex justify-between">
					<ButtonLogout />
				</div>
			</section>

			<section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
				<FormNewBoard />

				<div>
					<h1 className="font-extrabold text-xl mb-4">
						{user.boards.length} Boards
					</h1>

					<ul className="space-y-4">
						{user.boards.map((board) => {
							return (
								<li key={board._id}>
									<Link
										href={`/dashboard/b/${board._id}`}
										className="block bg-base-100 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200"
									>
										{board.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</section>
		</main>
	);
}
