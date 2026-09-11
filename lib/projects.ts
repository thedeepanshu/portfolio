export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'ev-battery',
    title: 'EV/Hybrid Battery Services',
    tag: 'FILE_01',
    description:
      'Independent build for a battery services business — full site from scratch, built to establish digital presence and generate leads.',
    stack: ['React', 'Tailwind', 'Vercel'],
  },
  {
    id: 'anrx-dashboard',
    title: 'Enterprise Dashboards',
    tag: 'FILE_02',
    description:
      'Frontend systems built at ANRX Solutions — data-dense dashboards used in production by enterprise clients.',
    stack: ['React.js', 'Enterprise UI'],
  },
  // add more real projects here as you build them out
];
