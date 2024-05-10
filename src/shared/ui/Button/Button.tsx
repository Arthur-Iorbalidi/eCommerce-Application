import './Button.scss';

interface Props {
  value: string;
  color: 'green' | 'red';
}

export default function Button({ value, color }: Props) {
  return <div className={`button ${color}`}>{value}</div>;
}
