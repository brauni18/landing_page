import { useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_ITEMS } from '@/consts/contact';
import { HOME_PARAGRAPHS } from '@/consts/homeParagraphs';
import { PROJECTS } from '@/consts/projects';
import { STACK_GROUPS } from '@/consts/stack';
import { Cards } from '@/ui/components/Cards';
import { Footer } from '@/ui/components/Footer';
import { NavBar } from '@/ui/components/NavBar';
import { SkillsList } from '@/ui/components/SkillsList';
import { readHoverMotionTokens } from '@/utils/motion';

gsap.registerPlugin(ScrollToPlugin);

export function Home() {
  const smoothNavigateToSection = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    event.preventDefault();

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    let focusDispatched = false;
    const dispatchSectionFocus = () => {
      if (focusDispatched) {
        return;
      }

      focusDispatched = true;
      window.dispatchEvent(
        new CustomEvent('section-nav-focus', {
          detail: { targetId },
        }),
      );
    };

    gsap.to(window, {
      duration: 0.82,
      ease: 'power2.out',
      overwrite: 'auto',
      scrollTo: {
        y: target,
        offsetY: 76,
        autoKill: true,
      },
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          dispatchSectionFocus();
        }
      },
      onComplete: () => {
        dispatchSectionFocus();
      },
      onInterrupt: () => {
        dispatchSectionFocus();
      },
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cleanupFns: Array<() => void> = [];
    const motion = readHoverMotionTokens();

    const animateSectionFromNav = (targetId: string) => {
      const section = document.querySelector<HTMLElement>(targetId);

      if (!section) {
        return;
      }

      const targetSelectorBySection: Record<string, string> = {
        '#about': '#about [data-reveal-item], #about .fade-in-block',
        '#skills': '#skills article',
        '#projects': '#projects .project-card',
        '#contact': '#contact > *',
        '#hero': '#hero .hero-reveal',
      };

      const selector = targetSelectorBySection[targetId];
      const targets = selector
        ? gsap.utils.toArray<HTMLElement>(selector)
        : [section];

      if (!targets.length) {
        return;
      }

      gsap.killTweensOf(targets);

      gsap
        .timeline()
        .to(targets, {
          y: -6,
          duration: 0.16,
          ease: 'power1.out',
          stagger: 0.03,
          overwrite: 'auto',
        })
        .to(targets, {
          y: 0,
          duration: 0.34,
          ease: 'power2.out',
          stagger: 0.04,
          overwrite: 'auto',
        });
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.14,
        },
      );

      gsap.to('.hero-grid-layer', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-orb-layer', {
        yPercent: -8,
        xPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>('[data-reveal-section]')
        .forEach((section) => {
          const revealItems = section.querySelectorAll<HTMLElement>(
            '[data-reveal-item], .fade-in-block',
          );

          if (!revealItems.length) {
            return;
          }

          gsap.fromTo(
            revealItems,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: section,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            },
          );
        });

      gsap.fromTo(
        '.site-footer',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        },
      );

      const heroSection = document.querySelector<HTMLElement>('#hero');
      const heroGlow = heroSection?.querySelector<HTMLElement>('.hero-mouse-glow');

      if (heroSection && heroGlow) {
        const handleHeroEnter = () => {
          gsap.to(heroGlow, {
            autoAlpha: motion.glowOpacity,
            duration: motion.enterDuration,
            ease: motion.ease,
          });
        };

        const handleHeroLeave = () => {
          gsap.to(heroGlow, {
            autoAlpha: 0,
            duration: motion.leaveDuration,
            ease: motion.ease,
          });
        };

        const handleHeroMove = (event: globalThis.MouseEvent) => {
          const rect = heroSection.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          heroGlow.style.background = `radial-gradient(${motion.glowRadiusHero}px circle at ${x}px ${y}px, rgba(181, 209, 116, ${motion.glowAlphaHero}), transparent 72%)`;
        };

        heroSection.addEventListener('mouseenter', handleHeroEnter);
        heroSection.addEventListener('mouseleave', handleHeroLeave);
        heroSection.addEventListener('mousemove', handleHeroMove);

        cleanupFns.push(() => {
          heroSection.removeEventListener('mouseenter', handleHeroEnter);
          heroSection.removeEventListener('mouseleave', handleHeroLeave);
          heroSection.removeEventListener('mousemove', handleHeroMove);
        });
      }
    });

    const onSectionNavFocus = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId?: string }>;
      const targetId = customEvent.detail?.targetId;

      if (!targetId) {
        return;
      }

      animateSectionFromNav(targetId);
    };

    window.addEventListener('section-nav-focus', onSectionNavFocus as EventListener);

    const nav = document.querySelector('nav');
    const onScroll = () => {
      if (!nav) {
        return;
      }
      nav.style.borderBottomColor =
        window.scrollY > 40 ? 'var(--nav-border-strong)' : 'var(--nav-border-soft)';
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
      window.removeEventListener('section-nav-focus', onSectionNavFocus as EventListener);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="bg-background text-foreground">
      <style>
        {`
          .scroll-pulse {
            animation: scroll-pulse 2s ease-in-out infinite;
          }

          @keyframes scroll-pulse {
            0%, 100% { opacity: 0.3; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.2); }
          }
        `}
      </style>

      <NavBar
        ctaLabel="Download CV"
        ctaHref="/CV/Tal%20Braunstein%20-%20CV.pdf"
        ctaDownload="Tal Braunstein - CV.pdf"
      />

      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 pt-32 md:px-12"
      >
        <span className="hero-mouse-glow pointer-events-none absolute inset-0 opacity-0" />

        <div
          className="hero-grid-layer pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage:
              'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
          }}
          aria-hidden
        />

        <div
          className="hero-orb-layer pointer-events-none absolute right-[-5%] top-[10%] rounded-full"
          style={{
            width: 520,
            height: 520,
            background:
              'radial-gradient(circle, rgba(77,124,62,0.18) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative z-10" style={{ maxWidth: 920 }}>
          <p className="hero-reveal mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-accent">
            <span className="inline-block h-px w-8 bg-accent" />
            Open to Collaborations
          </p>

          <h1 className="hero-reveal mb-7 font-serif text-5xl leading-[1.02] md:text-7xl lg:text-8xl" style={{ maxWidth: 900 }}>
           Tal Braunstein 
          </h1>
          <h2 className="hero-reveal mb-6 font-serif text-3xl leading-[1.02] md:text-5xl lg:text-6xl" style={{ maxWidth: 900 }}>
            <em className="text-accent">software engineer</em>
          </h2>

          <p className="hero-reveal mb-10 text-[15px] leading-7 text-muted" style={{ maxWidth: 560 }}>
            {HOME_PARAGRAPHS.heroPitch}
          </p>

          <div className="hero-reveal flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={(event) => smoothNavigateToSection(event, '#projects')}
              className="rounded-[2px] bg-accent px-8 py-3 font-mono text-[11px] uppercase tracking-widest text-background transition-[opacity,transform] hover:-translate-y-0.5 hover:opacity-85"
              style={{
                transitionDuration: 'var(--motion-hover-duration-in)',
                transitionTimingFunction: 'var(--motion-hover-ease)',
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(event) => smoothNavigateToSection(event, '#contact')}
              className="rounded-[2px] border border-(--border2) px-8 py-3 font-mono text-[11px] uppercase tracking-widest text-muted transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
              style={{
                transitionDuration: 'var(--motion-hover-duration-in)',
                transitionTimingFunction: 'var(--motion-hover-ease)',
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-6 hidden flex-col items-center gap-2 opacity-35 md:flex md:right-12">
          <div className="scroll-pulse h-12 w-px bg-linear-to-b from-muted to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted [writing-mode:vertical-rl]">
            Scroll
          </span>
        </div>
      </section>

      <section
        id="about"
        data-reveal-section
        className="border-t border-border px-6 py-24 md:px-12"
      >
        <div className="fade-in-block">
          <div className="mb-12 flex items-baseline gap-6">
            <span className="font-mono text-[11px] tracking-widest text-accent">
              01
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">About.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5 text-[15px] leading-7 text-muted">
              {HOME_PARAGRAPHS.aboutPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        data-reveal-section
        className="border-t border-border px-6 py-24 md:px-12"
      >
        <div className="mb-12 flex items-baseline gap-6 fade-in-block">
          <span className="font-mono text-[11px] tracking-widest text-accent">
            02
          </span>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Stack.</h2>
        </div>

        <SkillsList groups={STACK_GROUPS} />
      </section>

      <section
        id="projects"
        data-reveal-section
        className="border-t border-border px-6 py-24 md:px-12"
      >
        <div className="mb-12 flex items-baseline gap-6 fade-in-block">
          <span className="font-mono text-[11px] tracking-widest text-accent">
            03
          </span>
          <h2 className="font-serif text-4xl leading-tight md:text-6xl">Projects.</h2>
        </div>

        <Cards projects={PROJECTS} />
      </section>

      <section
        id="contact"
        data-reveal-section
        className="border-t border-border bg-card px-6 py-24 md:px-12"
      >
        <div className="fade-in-block">
          <div className="mb-8 flex items-baseline gap-6">
            <span className="font-mono text-[11px] tracking-widest text-accent">
              04
            </span>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">Contact.</h2>
          </div>

          <p className="mb-10 max-w-md text-[15px] leading-7 text-muted">
            {HOME_PARAGRAPHS.contactCta}
          </p>

          <ul className="space-y-3">
            {CONTACT_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="min-w-16 font-mono text-[10px] uppercase tracking-[0.11em] text-muted">
                  {item.label}
                </span>
                <a href={item.href} className="text-sm text-foreground hover:text-accent">
                  {item.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="site-footer">
        <Footer />
      </div>
    </div>
  );
}
