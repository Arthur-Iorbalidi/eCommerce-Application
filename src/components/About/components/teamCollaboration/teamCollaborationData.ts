interface Method {
  id: number;
  name: string;
  description: string;
}

const collaborationMethods: Method[] = [
  {
    id: 1,
    name: 'Planning Sessions',
    description: 'Focused on outlining project goals, tasks, and timelines.',
  },
  {
    id: 2,
    name: 'Code Review Sessions',
    description: 'Reviewing code for quality and adherence to standards.',
  },
  {
    id: 3,
    name: 'Daily progress reports',
    description: 'Updates on accomplishments and future plans.',
  },
  {
    id: 4,
    name: 'Tasks distribution meetings',
    description: 'Distributing responsibilities.',
  },
  {
    id: 5,
    name: 'Retrospective Meetings',
    description: 'Reflecting on project outcomes and planning improvements.',
  },
  {
    id: 6,
    name: 'Status Update Meetings',
    description:
      'Providing updates on project status and addressing challenges.',
  },
];

export default collaborationMethods;
