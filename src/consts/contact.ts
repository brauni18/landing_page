export type ContactItem = {
  label: 'Email' | 'GitHub' | 'LinkedIn';
  value: string;
  href: string;
};

export const CONTACT_ITEMS: ContactItem[] = [
  {
    label: 'Email',
    value: 'tal.brau@gmail.com',
    href: 'mailto:tal.brau@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/brauni18',
    href: 'https://github.com/brauni18',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/tal-braunstein',
    href: 'https://www.linkedin.com/in/tal-braunstein/',
  },
];

export const FOOTER_SOCIAL_LINKS = [
  {
    label: 'Email',
    href: 'mailto:tal.brau@gmail.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/brauni18',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tal-braunstein/',
  },
] as const;
