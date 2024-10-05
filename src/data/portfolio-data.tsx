import IconGithub from '@/components/icon/Github';

export const RESUME_DATA = {
  name: '백준원',
  initials: '준원',
  location: '대한민국 대전광역시',
  locationLink: 'https://www.google.com/maps/place/daejeon',
  about: '디테일에 주의를 기울이는 프론트엔드 개발자',
  summary: '',
  avatarUrl: '',
  //   personalWebsiteUrl: 'https://jarocki.me',
  contact: {
    email: 'woonn97@gmail.com',
    tel: '010-4400-8026',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/joonwonBaek',
        icon: IconGithub,
      },
    ],
  },
  education: [
    {
      school: '충북대학교',
      degree: '소프트웨어학과',
      start: '2017',
      end: '2024',
    },
  ],
  work: [
    {
      company: 'Film.io',
      link: 'https://film.io',
      badges: ['Remote'],
      title: 'Software Architect',
      start: '2024',
      end: null,
      description:
        'Leading the development of the Film.io platform. Technologies: React, TypeScript, Node.js',
      points: [''],
    },
  ],
  skills: ['Javascript', 'Typescript', 'React.js', 'Vue.js', 'Next.js'],
  projects: [
    {
      title: 'Parabol',
      techStack: [
        'Full Stack Developer',
        'TypeScript',
        'React',
        'Node.js',
        'GraphQL',
      ],
      description:
        'The Agile meeting co-pilot that delivers better meetings with less effort',
      link: {
        label: 'github.com',
        href: 'https://parabol.co/',
      },
    },
  ],
} as const;
