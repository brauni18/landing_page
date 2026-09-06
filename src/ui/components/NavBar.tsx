import { useEffect, useState, type MouseEvent } from 'react';
import { Download, House } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

type NavBarProps = {
  onDownloadCv?: (event: MouseEvent<HTMLAnchorElement>) => void;
  navItems?: ReadonlyArray<{ id: string; label: string }>;
  ctaLabel?: string;
  ctaHref?: string;
  ctaDownload?: string | boolean;
  onCtaClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  homeHref?: string;
};

const NAV_ITEMS = [
  { id: '#about', label: 'About' },
  { id: '#skills', label: 'Stack' },
  { id: '#projects', label: 'Projects' },
  { id: '#contact', label: 'Contact' },
] as const;

export function NavBar({
  onDownloadCv,
  navItems = NAV_ITEMS,
  ctaLabel,
  ctaHref,
  ctaDownload,
  onCtaClick,
  homeHref = '#hero',
}: NavBarProps) {
  const [activeSection, setActiveSection] = useState<string>(homeHref.startsWith('#') ? homeHref : '');

  useEffect(() => {
    const navOffset = 100;

    const updateActiveSection = () => {
      let currentSection = '#hero';

      navItems.forEach((item) => {
        if (!item.id.startsWith('#')) {
          return;
        }

        const section = document.querySelector<HTMLElement>(item.id);

        if (!section) {
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= navOffset) {
          currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [navItems]);

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setActiveSection(targetId);

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
      duration: 0.85,
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

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border bg-[rgba(10,10,8,0.85)] px-6 py-4 backdrop-blur-lg md:px-12">
      <a
        href={homeHref}
        onClick={homeHref.startsWith('#') ? (event) => onNavigate(event, homeHref) : undefined}
        aria-label="Back to top"
        className={`inline-flex items-center justify-center transition-colors ${activeSection === homeHref ? 'text-accent' : 'text-muted hover:text-foreground'}`}
      >
        <House size={16} strokeWidth={1.8} />
        <span className="sr-only">Home</span>
      </a>

      <ul className="hidden items-center gap-10 md:flex">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.id}
              onClick={item.id.startsWith('#') ? (event) => onNavigate(event, item.id) : undefined}
              className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${activeSection === item.id ? 'text-accent' : 'text-muted hover:text-foreground'}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {ctaLabel && ctaHref ? (
        <a
          href={ctaHref}
          onClick={onCtaClick ?? onDownloadCv}
          download={ctaDownload}
          className="inline-flex items-center gap-2 rounded-[2px] bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-background transition-opacity hover:opacity-85"
        >
          <Download size={14} strokeWidth={2} aria-hidden="true" />
          <span>{ctaLabel}</span>
        </a>
      ) : (
        <span className="hidden h-8 w-25.25 md:block" aria-hidden="true" />
      )}
    </nav>
  );
}
