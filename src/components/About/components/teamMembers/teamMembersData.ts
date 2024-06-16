// import member1 from '../../../../assets/images/AboutPage/teamMembers/member1.jpg';
// import member2 from '../../../../assets/images/AboutPage/teamMembers/member2.jpg';
import member3 from '../../../../assets/images/AboutPage/teamMembers/member-placeholder.png';

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
    bio: 'Ipsum nunc aliquet bibendum enim. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Viverra nibh cross pulvinar mattis nunc sed blandit. Sed elementum tempus egestas sed sed risus pretium. ',

    contributions: [
      'Main Page',
      'Product Page',
      'About Us Page',
      'Login Page',
      'Catalog Filters',
    ],
    githubLink: 'https://github.com/ViolettaStolarova',
    photo: member3,
  },
  {
    id: 2,
    name: 'Arthur Iorbalidi',
    role: 'Front-end developer & Team Lead',
    bio: 'Ipsum nunc aliquet bibendum enim. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Viverra nibh cross pulvinar mattis nunc sed blandit. Sed elementum tempus egestas sed sed risus pretium. Nascetur ridiculus mus mauris vitae ultricies. ',
    contributions: [
      'Repository and task board setup',
      'Registration Page',
      'Catalog Page',
      'Product Search',
      'Catalog Sort',
    ],
    githubLink: 'https://github.com/Arthur-Iorbalidi',
    photo: member3,
  },
  {
    id: 3,
    name: 'Stanislav Shkradov',
    role: 'Front-end developer',
    bio: 'Ipsum nunc aliquet bibendum enim. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Viverra nibh cross pulvinar mattis nunc sed blandit. Sed elementum tempus egestas sed sed risus pretium. Nascetur ridiculus mus mauris vitae ultricies. ',
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
