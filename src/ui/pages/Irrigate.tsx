import { NavBar } from '@/ui/components/NavBar';

const LIVE_URL = 'https://irrigate-ochre.vercel.app/login';
const GITHUB_URL = 'https://github.com/brauni18/Irrigate';
const TECH_STACK = ['JavaScript', 'Node.js', 'MongoDB', 'React', 'Automation'];
const PRODUCT_PILLARS = ['Plan irrigation logic', 'Automate schedules', 'Manage system access'];

export function Irrigate() {
	return (
		<div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
			<NavBar navItems={[]} homeHref="/" />

			<section className="relative isolate overflow-hidden px-6 pb-20 pt-28 md:px-12 md:pb-24 md:pt-32">
				<div className="pointer-events-none absolute inset-0 opacity-50">
					<div
						className="h-full w-full"
						style={{
							backgroundImage:
								'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
							backgroundSize: '48px 48px',
							maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black, transparent 88%)',
						}}
					/>
				</div>

				<div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(181,209,116,0.23)_0%,rgba(181,209,116,0)_70%)] blur-sm" />

				<div className="relative mx-auto max-w-5xl">
					<p className="mb-5 inline-flex items-center gap-2 rounded-[1px] border border-border bg-card/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
						<span className="h-1.5 w-1.5 rounded-full bg-accent" />
						Software Project
					</p>

					<h1 className="mb-8 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
						Irrigate
					</h1>

					<div className="mb-12 flex flex-wrap gap-2">
						{TECH_STACK.map((tech) => (
							<span
								key={tech}
								className="rounded-[1px] border border-border bg-card px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</section>

			<section className="border-t border-border px-6 py-12 md:px-12 md:py-16">
				<div className="mx-auto max-w-5xl border border-border bg-card/35 p-7 md:p-10">
					<div>
						<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
							Live Product
						</p>

						<h2 className="mb-4 max-w-xl font-serif text-3xl leading-tight md:text-4xl">
							Explore the working platform directly.
						</h2>

						<p className="mb-6 max-w-xl text-sm leading-7 text-muted md:text-base">
							The full visual case study is still coming, but the product itself is live. If you want
							to get a feel for the system, jump into the real application and see how the irrigation
							workflow is structured.
						</p>

						<div className="mb-6 flex flex-wrap gap-3">
							<a
								href={LIVE_URL}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center rounded-[1px] border border-accent bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-background transition hover:opacity-90"
							>
								Open Live App
							</a>
							<a
								href={GITHUB_URL}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center rounded-[1px] border border-border bg-card px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground transition hover:opacity-90"
							>
								View GitHub Repo
							</a>
						</div>

						<div className="flex flex-wrap gap-2">
							{PRODUCT_PILLARS.map((item) => (
								<span
									key={item}
									className="rounded-[1px] border border-border bg-background/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
								>
									{item}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
