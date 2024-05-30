import { ReactNode } from 'react';
import './Button.scss';

interface Props {
  value: string | ReactNode;
  color: 'green' | 'red';
  className?: string | undefined | null;
  type?: 'reset' | 'submit' | 'button' | undefined;
  onClick?: (() => void) | undefined | null;
}

export default function Button({
  value,
  color,
  type = 'button',
  className = null,
  onClick = null,
}: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button ${color} ${className}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {value}
    </button>
  );
}
