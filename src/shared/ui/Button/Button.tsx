import './Button.scss';

interface Props {
  value: string;
  color: 'green' | 'red';
  className?: string | undefined | null;
  onClick?: (() => void) | undefined | null;
}

export default function Button({
  value,
  color,
  className = null,
  onClick = null,
}: Props) {
  return (
    <button
      type="button"
      className={`button ${color} ${className}`}
      onClick={() => (onClick ? onClick() : null)}
    >
      {value}
    </button>
  );
}

Button.defaultProps = { className: null, onClick: null };
