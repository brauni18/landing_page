import { NavBar } from '@/ui/components/NavBar';

type ProjectPageTemplateProps = {
  projectName: string;
  projectType: string;
  techStack: string[];
};

export function ProjectPageTemplate({
  projectName,
  projectType,
  techStack,
}: ProjectPageTemplateProps) {
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
            {projectType}
          </p>

          <h1 className="mb-8 max-w-4xl font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
            {projectName}
          </h1>

          <div className="mb-12 flex flex-wrap gap-2">
            {techStack.map((tech) => (
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
        <div className="mx-auto grid max-w-5xl gap-8 border border-border bg-card/35 p-7 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              Blog Under Construction
            </p>

            <h2 className="mb-4 font-serif text-3xl leading-tight md:text-4xl">
              This case study is still being built.
            </h2>

            <p className="max-w-xl text-sm leading-7 text-muted md:text-base">
              Blog under construction... The full breakdown, visuals, and behind-the-scenes details
              are on the way.
            </p>
          </div>

          <div className="flex items-center justify-center rounded-[1px] border border-dashed border-border bg-background/70 p-4">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 260'%3E%3Crect width='360' height='260' rx='18' fill='%2310100d'/%3E%3Crect x='26' y='36' width='308' height='188' rx='14' fill='%23171714' stroke='%23ffffff' stroke-opacity='.12'/%3E%3Cg transform='translate(60 40)'%3E%3Cpath d='M90 96h38l14 14h50v42H14v-42h62z' fill='%23262822'/%3E%3Ccircle cx='42' cy='158' r='16' fill='%23b5d174'/%3E%3Ccircle cx='152' cy='158' r='16' fill='%23b5d174'/%3E%3Crect x='82' y='58' width='48' height='16' rx='8' fill='%23b5d174'/%3E%3Cpath d='M172 40l10 18 20 3-14 14 4 20-18-10-18 10 4-20-14-14 20-3z' fill='%23e8e6df' fill-opacity='.75'/%3E%3C/g%3E%3Ctext x='180' y='236' text-anchor='middle' fill='%23b5d174' font-family='monospace' font-size='14' letter-spacing='2'%3EPARDON THE DUST%3C/text%3E%3C/svg%3E"
              alt="Playful construction illustration"
              className="h-auto w-full max-w-[280px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
