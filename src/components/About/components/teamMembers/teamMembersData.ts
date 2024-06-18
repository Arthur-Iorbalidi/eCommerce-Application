import member1 from '../../../../assets/images/AboutPage/teamMembers/member1.jpg';
import member2 from '../../../../assets/images/AboutPage/teamMembers/member2.jpg';
import member3 from '../../../../assets/images/AboutPage/teamMembers/member3.jpg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  contributions: string[];
  bio: string;
  githubLink: string;
  photo: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Violetta Stolarova',
    role: 'Front-end developer',
    bio: "I'm a second-year student at the Belarusian State University of Informatics and Radioelectronics, specializing in automated information processing systems. My primary goal is to deepen my knowledge in front-end development. Skills: HTML, CSS(SCSS), JS, TS, React, C++, SQL.",

    contributions: [
      'Main Page',
      'Product Page',
      'About Us Page',
      'Login Page',
      'Catalog Filters',
    ],
    githubLink: 'https://github.com/ViolettaStolarova',
    photo: member1,
  },
  {
    id: 2,
    name: 'Arthur Iorbalidi',
    role: 'Front-end developer & Team Lead',
    bio: 'I am a student at the Belarusian-Russian University, majoring in software engineering. I like programming, especially front-end development. In addition to programming, I am keen on basketball and cycling. Skills: HTML, CSS(SCSS), JS, TS, React, C#, SQL, Java.',
    contributions: [
      'Repository and task board setup',
      'Registration Page',
      'Catalog Page',
      'Product Search',
      'Catalog Sort',
    ],
    githubLink: 'https://github.com/Arthur-Iorbalidi',
    photo: member2,
  },
  {
    id: 3,
    name: 'Stanislav Shkradov',
    role: 'Front-end developer',
    bio: 'Lawyer by higher education, coder at heart. Skills: HTML, CSS(SCSS), JS, TS, React, Redux.',
    contributions: [
      'CommerceTools Setup',
      'API client Setup',
      'Project Setup',
      'Routing implementation',
      'User Profile Page',
    ],
    githubLink: 'https://github.com/StasDevel',
    photo: member3,
  },
];

export default teamMembers;
