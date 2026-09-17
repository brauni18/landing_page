import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/consts/projects';
import { readHoverMotionTokens } from '@/utils/motion';

type CardsProps = {
  projects: Project[];
};

const SUBJECT_TABS: Array<{ value: Project['subject']; label: string }> = [
  { value: 'coding', label: 'Coding' },
  { value: 'landscape-architecture', label: 'Landscape Architecture' },
  { value: 'hobby', label: 'Hobby' },
];

function projectTypeClasses(type: Project['type']) {
  if (type === 'Software') {
    return 'bg-[rgba(77,124,62,0.2)] text-accent';
  }

  if (type === 'Landscape') {
    return 'bg-[rgba(90,120,200,0.15)] text-[#7aaee8]';
  }

  return 'bg-[rgba(200,130,80,0.15)] text-[#e8a87a]';
}

export function Cards({ projects }: CardsProps) {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [activeSubject, setActiveSubject] = useState<Project['subject']>('coding');

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.subject === activeSubject),
    [activeSubject, projects],
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const motion = readHoverMotionTokens();
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');

      if (!cards.length) {
        return;
      }

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      cards.forEach((card) => {
        const glow = card.querySelector<HTMLElement>('.project-card-glow');

        const handleEnter = () => {
          gsap.to(card, {
            y: motion.liftY,
            scale: motion.scale,
            duration: motion.enterDuration,
            ease: motion.ease,
          });

          if (glow) {
            gsap.to(glow, {
              autoAlpha: motion.glowOpacity,
              duration: motion.enterDuration,
              ease: motion.ease,
            });
          }
        };

        const handleLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: motion.leaveDuration,
            ease: motion.ease,
          });

          if (glow) {
            gsap.to(glow, {
              autoAlpha: 0,
              duration: motion.leaveDuration,
              ease: motion.ease,
            });
          }
        };

        const handleMove = (event: MouseEvent) => {
          if (!glow) {
            return;
          }

          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          glow.style.background = `radial-gradient(${motion.glowRadiusProject}px circle at ${x}px ${y}px, rgba(181, 209, 116, ${motion.glowAlphaProject}), transparent 70%)`;
        };

        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);
        card.addEventListener('mousemove', handleMove);

        cleanupFns.push(() => {
          card.removeEventListener('mouseenter', handleEnter);
          card.removeEventListener('mouseleave', handleLeave);
          card.removeEventListener('mousemove', handleMove);
        });
      });
    }, cardsRef);

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, [activeSubject, visibleProjects.length]);

  const timelineLabel = (index: number) => {
    const step = String(index + 1).padStart(2, '0');
    const total = String(visibleProjects.length).padStart(2, '0');
    return `${step} / ${total}`;
  };

  return (
    <div ref={cardsRef} className="fade-in-block">
      <div className="border border-border bg-card/20">
        <div className="border-b border-border px-4 py-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {SUBJECT_TABS.map((tab, index) => {
              const isActive = activeSubject === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveSubject(tab.value)}
                  className={`group inline-flex items-center gap-3 rounded-[1px] border px-3 py-2 text-left transition-colors ${
                    isActive
                      ? 'border-accent bg-[rgba(77,124,62,0.18)] text-foreground'
                      : 'border-border bg-background/30 text-muted hover:border-border2 hover:text-foreground'
                  }`}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current/30 font-mono text-[10px] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-px border-t border-border md:grid-cols-2">
          {visibleProjects.map((project, index) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="project-card group relative block overflow-hidden bg-card p-8 text-inherit no-underline transition-colors hover:bg-secondary"
          >
            <span className="project-card-glow pointer-events-none absolute inset-0 opacity-0" />

            <span className="pointer-events-none absolute right-4 top-4 font-mono text-4xl text-(--border2)/30">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="absolute right-6 top-6 text-lg text-(--border2) transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
              ↗
            </span>

            <span
              className={`mb-6 inline-block rounded-[1px] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${projectTypeClasses(project.type)}`}
            >
              {project.type}
            </span>

            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Timeline {timelineLabel(index)}
            </p>

            <h3 className="mb-3 font-serif text-2xl leading-tight text-foreground">
              {project.title}
            </h3>

            <p className="mb-6 text-sm leading-7 text-muted">{project.description}</p>

            <div className="mb-7 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[1px] border border-border px-2 py-1 font-mono text-[10px] tracking-[0.05em] text-muted transition-colors group-hover:border-border2 group-hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent/80 transition-colors group-hover:text-accent">
              Open Project
            </p>

            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100" />
          </a>
          ))}
        </div>

        {!visibleProjects.length && (
          <div className="px-6 py-12 text-sm text-muted">
            No projects available in this subject yet.
          </div>
        )}
      </div>
    </div>
  );
}
