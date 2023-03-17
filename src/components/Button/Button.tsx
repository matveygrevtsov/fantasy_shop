import cn from "classnames";
import { PropsWithChildren } from "react";

import s from "./Button.module.css";

interface Props {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<PropsWithChildren<Props>> = ({
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
