/* eslint-disable react/button-has-type */
import './Button.scss';

interface Props {
  value: string;
  color: 'green' | 'red';
  className?: string | undefined | null;
  type?: 'reset' | 'submit' | 'button';
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
      type={type}
      className={`button ${color} ${className}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {value}
    </button>
  );
}

Button.defaultProps = { className: null, onClick: null };
