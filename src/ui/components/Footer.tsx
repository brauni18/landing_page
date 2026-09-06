import { Github, Linkedin, Mail } from 'lucide-react';
import { FOOTER_SOCIAL_LINKS } from '@/consts/contact';
import { HOME_PARAGRAPHS } from '@/consts/homeParagraphs';

const socialIcons = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 md:flex-row md:px-12">
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
        {HOME_PARAGRAPHS.footerCopyright}
      </p>
      <ul className="flex items-center gap-6">
        {FOOTER_SOCIAL_LINKS.map((item) => {
          const Icon = socialIcons[item.label];

          if (!Icon) {
            return null;
          }

          return (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon size={16} strokeWidth={1.8} />
                <span className="sr-only">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
