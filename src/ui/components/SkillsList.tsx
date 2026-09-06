import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { StackGroup } from '@/consts/stack';
import { readHoverMotionTokens } from '@/utils/motion';

type SkillsListProps = {
  groups: StackGroup[];
};

export function SkillsList({ groups }: SkillsListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cleanupFns: Array<() => void> = [];
    const motion = readHoverMotionTokens();

    const cards = listRef.current?.querySelectorAll<HTMLElement>('.stack-track-card') ?? [];

    cards.forEach((card) => {
      const glow = card.querySelector<HTMLElement>('.stack-track-glow');

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

        glow.style.background = `radial-gradient(${motion.glowRadiusStack}px circle at ${x}px ${y}px, rgba(181, 209, 116, ${motion.glowAlphaStack}), transparent 72%)`;
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

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <div ref={listRef} className="grid gap-6 md:grid-cols-2">
      {groups.map((group) => (
        <article
          key={group.title}
          className="stack-track-card fade-in-block group relative overflow-hidden rounded-[2px] border border-border bg-card/40 p-5 transition-[transform,background-color,border-color] hover:border-border2 hover:bg-card/60"
          style={{
            transitionDuration: 'var(--motion-hover-duration-in)',
            transitionTimingFunction: 'var(--motion-hover-ease)',
          }}
        >
          <span
            className="stack-track-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          />

          <div className="mb-5 flex items-center gap-3">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {group.title}
            </h3>
            <span className="h-px flex-1 bg-linear-to-r from-accent/70 to-transparent" />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {group.stacks.map((stack) => (
              <span
                key={stack.name}
                className="rounded-[2px] border border-border px-3 py-1.5 text-[12px] tracking-[0.02em] text-foreground transition-[border-color,transform] group-hover:border-border2 hover:border-accent/60"
                style={{
                  transitionDuration: 'var(--motion-hover-duration-in)',
                  transitionTimingFunction: 'var(--motion-hover-ease)',
                }}
              >
                {stack.name}
              </span>
            ))}
          </div>

          <div className="mt-5 h-px bg-linear-to-r from-accent/60 via-accent/20 to-transparent" />
        </article>
      ))}
    </div>
  );
}
