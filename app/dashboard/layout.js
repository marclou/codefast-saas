import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LayoutPrivate({ children }) {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	return children;
}
