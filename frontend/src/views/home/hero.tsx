export default function Hero() {
	return (
		<section className="py-10 overflow-hidden">
			<div className="max-w-[var(--max-width)] mx-auto relative">
				<div className="w-[300px] h-[300px] block mx-auto md:mr-0 md:ml-0 border-border border">
					<h1 className="uppercase text-[82px] font-[82px] ml-[-12px] tracking-[3.5px] [-webkit-text-stroke:2px_var(--primary)] text-background">
						Non Profit Devs
					</h1>
				</div>
				<svg
					className="hidden absolute opacity-10 top-5 -right-[35%] text-muted-foreground md:block"
					xmlns="http://www.w3.org/2000/svg"
					width="610"
					height="268"
					viewBox="0 0 610 268"
				>
					<title>Bricks</title>
					<rect
						id="_5"
						data-name="5"
						width="230"
						height="74"
						rx="5"
						transform="translate(252 194)"
						fill="currentColor"
					/>
					<rect
						id="_4"
						data-name="4"
						width="230"
						height="74"
						rx="5"
						transform="translate(0 194)"
						fill="currentColor"
					/>
					<rect
						id="_3"
						data-name="3"
						width="230"
						height="76"
						rx="5"
						transform="translate(380 96)"
						fill="currentColor"
					/>
					<rect
						id="_2"
						data-name="2"
						width="232"
						height="76"
						rx="5"
						transform="translate(126 96)"
						fill="currentColor"
					/>
					<rect
						id="_1"
						data-name="1"
						width="230"
						height="74"
						rx="5"
						fill="currentColor"
					/>
				</svg>
			</div>
		</section>
	);
}
