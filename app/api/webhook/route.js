import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connectMongo from "@/libs/mongoose";
import crypto from "crypto";
import User from "@/models/User";

export async function POST(req) {
	try {
		// Verify webhook is coming from LemonSqueezy
		const body = await req.text();

		const hmac = crypto.createHmac("sha256", process.env.LS_SIGNING_SECRET);
		const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
		const signature = Buffer.from(headers().get("x-signature"), "utf8");

		if (!crypto.timingSafeEqual(digest, signature)) {
			return NextResponse.json(
				{ error: "Invalid signature" },
				{ status: 400 }
			);
		}

		const payload = JSON.parse(body);
		const eventName = payload.meta.event_name;

		if (eventName === "order_created") {
			// ✅ Grant access to the product

			await connectMongo();

			const user = await User.findById(payload.meta.custom_data.user_id);

			user.hasAccess = true;
			user.customerId = payload.data.attributes.customer_id;

			await user.save();
		} else if (
			eventName === "subscription_expired" ||
			eventName === "subscription_payment_failed"
		) {
			// ❌ Revoke access to the product

			await connectMongo();

			const user = await User.findById(payload.meta.custom_data.user_id);

			user.hasAccess = false;

			await user.save();
		}
	} catch (e) {
		console.error("LemonSqueezy error: ", e?.message);
	}

	return NextResponse.json({});
}
