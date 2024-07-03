import ButtonLogin from "@/components/ButtonLogin";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "./productDemo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
	const session = await auth();

	return (
		<main>
			{/* HEADER */}
			<section className="bg-base-200">
				<div className="max-w-5xl mx-auto flex justify-between items-center px-8 py-2">
					<div className="font-bold">CodeFastSaaS</div>
					<div className="space-x-4 max-md:hidden">
						<a className="link link-hover" href="#pricing">
							Pricing
						</a>
						<a className="link link-hover" href="#faq">
							FAQ
						</a>
					</div>
					<div>
						<ButtonLogin session={session} />
					</div>
				</div>
			</section>

			{/* HERO */}
			<section className="text-center lg:text-left py-32 px-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-14 items-center lg:items-start">
				<Image
					src={productDemo}
					alt="Product demo"
					className="w-96 rounded-xl"
				/>

				<div>
					<h1 className="text-4xl lg:text-5xl font-extrabold mb-6">
						Collect customer feedback to build better products
					</h1>
					<div className="opacity-90 mb-10">
						Create a feeedback board in minutes, prioritize
						features, and build products your customers will love.
					</div>
					<ButtonLogin session={session} />
				</div>
			</section>

			{/* PRICING */}
			<section className="bg-base-200" id="pricing">
				<div className="py-32 px-8 max-w-3xl mx-auto">
					<p className="text-sm uppercase font-medium text-center text-primary mb-4">
						Pricing
					</p>
					<h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
						A pricing that adapts to your needs
					</h2>

					<div className="p-8 bg-base-100 max-w-96 rounded-3xl mx-auto space-y-6">
						<div className="flex gap-2 items-baseline">
							<div className="text-4xl font-black">$19</div>
							<div className="uppercase text-sm font-medium opacity-60">
								/month
							</div>
						</div>

						<ul className="space-y-2">
							{[
								"Collect customer feedback",
								"Unlimited boards",
								"Admin dashboard",
								"24/7 support",
							].map((priceItem) => (
								<li
									className="flex gap-2 items-center"
									key={priceItem}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 16 16"
										fill="currentColor"
										className="text-green-600 size-4"
									>
										<path
											fillRule="evenodd"
											d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
											clipRule="evenodd"
										/>
									</svg>
									{priceItem}
								</li>
							))}
						</ul>

						<ButtonLogin session={session} extraStyle="w-full" />
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="bg-base-200" id="faq">
				<div className="py-32 px-8 max-w-3xl mx-auto">
					<p className="text-sm uppercase font-medium text-center text-primary mb-4">
						FAQ
					</p>
					<h2 className="text-3xl lg:text-4xl font-extrabold mb-12 text-center">
						Frequently Asked Questions
					</h2>

					<ul className="max-w-lg mx-auto">
						{[
							{
								question: "What do I get exactly?",
								answer: "Loreum Ipseum",
							},
							{
								question: "Can I get a refund?",
								answer: "Loreum Ipseum",
							},
							{
								question: "I have another question",
								answer: "Loreum Ipseum",
							},
						].map((qa) => (
							<FAQListItem key={qa.question} qa={qa} />
						))}
					</ul>
				</div>
			</section>
		</main>
	);
}
