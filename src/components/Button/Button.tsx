import cn from "classnames";

import s from "./Button.module.css";

interface Props {
  className?: string;
  children?: JSX.Element | string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<Props> = ({
  className,
  children,
  disabled,
  onClick,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(s.root, className)}
    >
      {children}
    </button>
  );
};
