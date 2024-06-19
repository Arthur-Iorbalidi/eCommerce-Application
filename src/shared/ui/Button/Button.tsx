import { ReactNode } from 'react';
import './Button.scss';

interface Props {
  value: string | ReactNode;
  color: 'green' | 'red' | 'grey';
  className?: string | undefined | null;
  disabled?: boolean;
  type?: 'reset' | 'submit' | 'button' | undefined;
  onClick?: ((val?: MouseEvent) => void | null) | undefined | null;
}

export default function Button({
  value,
  color,
  disabled,
  type = 'button',
  className = null,
  onClick = null,
}: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`button ${color} ${className}`}
      onClick={(event) => {
        event.stopPropagation();
        return onClick ? onClick() : null;
      }}
    >
      {value}
    </button>
  );
}
