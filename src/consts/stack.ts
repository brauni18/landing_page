export type Stack = {
  name: string;
};

export type StackGroup = {
  title: string;
  stacks: Stack[];
};

export const STACK_GROUPS: StackGroup[] = [
  {
    title: 'Frontend',
    stacks: [
      { name: 'TypeScript / JavaScript' },
      { name: 'React / Vite' },
      { name: 'HTML / CSS' },
    ],
  },
  {
    title: 'Backend',
    stacks: [
      { name: 'Python' },
      { name: 'Node.js / Express' },
      { name: 'MongoDB / Mongoose' },
      { name: 'REST API Design' },
    ],
  },
  {
    title: 'DevOps & Tools',
    stacks: [
      { name: 'Linux' },
      { name: 'Git / GitHub' },
      { name: 'AWS' },
      { name: 'Cloudflare' },
      { name: 'Testing Basics' },
      { name: 'CI/CD Fundamentals' },
    ],
  },
  {
    title: 'Exploring',
    stacks: [
      { name: 'System Design' },
      { name: 'AI-Assisted Development' },
      { name: 'MCPs' },
    ],
  },
];
