"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
	const dashboardUrl = "/dashboard";

	if (session) {
		return (
			<Link
				href={dashboardUrl}
				className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
			>
				Welcome back {session.user.name || "friend"}
			</Link>
		);
	}

	return (
		<button
			className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
			onClick={() => {
				signIn(undefined, { callbackUrl: dashboardUrl });
			}}
		>
			Get started
		</button>
	);
};

export default ButtonLogin;
