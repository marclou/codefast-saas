import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { lemonSqueezySetup, getCustomer } from "@lemonsqueezy/lemonsqueezy.js";

export async function POST() {
	const session = await auth();

	await connectMongo();
	const user = await User.findById(session.user.id);

	lemonSqueezySetup({
		apiKey: process.env.LS_API_KEY,
	});

	const customer = await getCustomer(user.customerId);

	return NextResponse.json({
		url: customer.data.data.attributes.urls.customer_portal,
	});
}
