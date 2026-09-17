export type Project = {
  subject: 'coding' | 'landscape-architecture' | 'hobby';
  type: 'Software' | 'Hybrid' | 'Landscape';
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export const PROJECTS: Project[] = [
  {
    subject: 'coding',
    type: 'Software',
    title: 'Irrigate',
    description:
      'responsive web application to calculate, schedule, control, and automate large irrigation systems.',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'Cloudflare R2', 'Vercel', 'Render', 'Landscape Architecture'],
    href: 'https://irrigate-ochre.vercel.app/login',
  },
  {
    subject: 'coding',
    type: 'Software',
    title: 'ColdChain',
    description:
      'real-time IoT monitoring system for industrial refrigeration using DS18B20 sensors and Raspberry Pi microcontrollers.',
    tags: ['TypeScript', 'React', 'Python', 'Raspberry Pi', 'AWS services'],
    href: 'https://github.com/brauni18/cold-chain.git',
    
  },
  {
    subject: 'coding',
    type: 'Software',
    title: 'Traveling For Sports',
    description:
      'Developed a web platform during a hackathon to manage sports travel logistics, including scheduling, accommodation, and transportation for teams and athletes.',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    href: 'https://github.com/brauni18/Traveling-4-Sports.git',
  },
  {
    subject: 'coding',
    type: 'Software',
    title: 'HomeCloud',
    description:
      'Developed a self-hosted, full-stack cloud storage application prioritizing data sovereignty and secure file management. Built a responsive React/TypeScript front-end integrated with a Node.js backend.',
    tags: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Cloudflare Tunnel'],
    href: 'https://github.com/Colman-Dev-Club-HomeDrive/HomeDriveFrontend.git',
  },
];
